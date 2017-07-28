import React, { Component } from 'react';
import Color from 'color';
import ControlCanvas from './ControlCanvas';

class HSLControls extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...props.passed,
      mouse: {
        down: false,
        x: 0,
        y: 0,
        changing: false
      }
    }
    this.center = props.center.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState(prev => {
      return { ...prev, ...newProps.passed}
    })
  }

  mouseInRing(r1, r2, x = this.state.mouse.x, y = this.state.mouse.y){
    const inner = this.mouseInCircle(r2, x, y);
    const outer = this.mouseInCircle(r1, x, y);
    return outer && !inner;
  }

  mouseInCircle(r, x = this.state.mouse.x, y = this.state.mouse.y){
    const center = this.center();
    const xSquared = Math.pow((x - center.x), 2);
    const ySquared = Math.pow((y - center.y), 2);
    const distance = Math.sqrt(xSquared + ySquared);
    return r <= distance;
  }

  mouseCenterAngle(x = this.state.mouse.x, y = this.state.mouse.y){
    const center = this.center();
    const slope = (y - center.y) / (x - center.x);
    const angle = Math.atan(slope) * 180/Math.PI;
    if (x >= center.x ){
      if(y <= center.y){
        return (360 + angle);
      }else{
        return (angle);
      }
    } else {
      if(y <= center.y){
        return (180 + angle);
      }else{
        return (180 + angle);
      }
    }
    return angle;
  }

  inAngle(angle, start, end){
    const thickness = this.state.curve.r2 - this.state.curve.r1;
    const dist = this.state.curve.r1 + thickness / 2;
    const extra = (Math.atan(thickness / dist) / 2) * 180/Math.PI;
    if (start < end){
      return angle >= start - extra && angle <= end + extra;
    } else {
      return (angle >= start - extra && angle <= 360) || (angle <= end + extra && angle >= 0);
    }

  }

  handleMouse(){
    if(this.state.mouse.down && this.state.mouse.changing){
      const prop = this.state.mouse.changing;
      const angle = this.mouseCenterAngle();
      const color = {...this.state.color.hsl().object()}
      if(prop === 'h'){
        color.h = angle;
      } else {
        let start = this.state.curve[prop].angle.start;
        start = start < 0 ? (360 + start) : start;
        let val = angle - start;
        val = val < -10 ? val + 360 : val;
        val = val < 0 ? 0 : val;
        val = val > 100 ? 100 : val;
        color[prop] = val;
      }
      this.props.setColor(Color.hsl(color))
    }
  }

  setMouse(e, down = 0){
    const x = e.clientX - e.target.parentNode.offsetLeft,
          y = e.clientY - e.target.parentNode.offsetTop;

    this.setState(prev => {
      const isDown = down > 0 ? true : down < 0 ? false : prev.mouse.down;
      if (down < 0){
        prev.mouse.changing = false
      } else if(this.mouseInRing(this.state.wheel.r1, this.state.wheel.r2, x, y)){
          prev.mouse.changing = 'h';
      }else if (this.mouseInRing(this.state.curve.r1, this.state.curve.r2, x, y)){
        ['s', 'l'].forEach(prop => {
          const angleR = this.state.curve[prop].angle
          if(this.inAngle(this.mouseCenterAngle(x, y), angleR.start, angleR.end)){
            prev.mouse.changing = prop;
          }
        })

      }
      prev.mouse.x = x;
      prev.mouse.y = y;
      prev.mouse.down = isDown;
      return prev;
    }, this.handleMouse.bind(this))
  }

  allProps(){
    const r = (this.state.wheel.r2 - this.state.wheel.r1) / 2
    return {
      color: this.state.color,
      radius: r + (r/10),
      width: this.state.width,
      height: this.state.height,
      edge: this.state.edge
    }
  }

  hueControlProps(){
    return {
      ...this.allProps(),
      distance: (this.state.wheel.r1 + this.state.wheel.r2) / 2,
      angle: this.state.color.hsl().object().h
    }
  }

  sControlProps(){
    return {
      ...this.allProps(),
      distance: (this.state.curve.r1 + this.state.curve.r2) / 2,
      angle: this.state.color.hsl().object().s + this.state.curve.s.angle.start
    }
  }
  lControlProps(){
    return {
      ...this.allProps(),
      distance: (this.state.curve.r1 + this.state.curve.r2) / 2,
      angle: this.state.color.hsl().object().l + this.state.curve.l.angle.start
    }
  }


  render () {
    return (
      <div
        style={{
          height:this.state.height,
          width:this.state.width
        }}
        onMouseDown={(e)=>{
          this.setMouse(e, 1);
        }}
        onMouseUp={(e) => {
          this.setMouse(e, -1);
        }}
        onMouseMove={(e) => {
          this.setMouse(e, 0);
        }}
      >
        <ControlCanvas
          passed={{...this.hueControlProps()}}
          center={this.center}
        />
        <ControlCanvas
          passed={{...this.sControlProps()}}
          center={this.center}
        />
        <ControlCanvas
          passed={{...this.lControlProps()}}
          center={this.center}
        />
      </div>
    )
  }
}

export default HSLControls
