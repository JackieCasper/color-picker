import React, { Component } from 'react';
import Color from 'color';


class ColorWheel extends Component {
  constructor(props){
    super()
    this.state = {
      ...props.passed,
      radius1: props.radius1,
      radius2: props.radius2
    }
    this.center = props.center.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState((prev) => {
      const newState = {...prev, ...newProps.passed}
      newState.radius1 = newProps.radius1;
      newState.radius2 = newProps.radius2;
      if(!newState.ctx){
        newState.ctx = {
          wheel: this.refs.wheel.getContext('2d'),
          wheelShadow: this.refs.wheelShadow.getContext('2d'),
          wheelControl: this.refs.wheelControl.getContext('2d'),
        }
      }
      return newState;
    }, this.updateCanvas.bind(this))
  }

  updateCanvas(){
      this.drawHueRingShadow();
      this.drawHueRing();
  }

  drawHueRingShadow(){
    const ctx = this.state.ctx.wheelShadow;
    const center = this.center();
    const radius1 = this.state.radius1;
    const radius2 = this.state.radius2;
    const width = radius2 - radius1;
    const radius = radius1 + width / 2

    ctx.clearRect(0, 0, this.state.width, this.state.height);

    ctx.strokeStyle = this.state.edge.color;
    ctx.lineWidth = width + this.state.edge.size;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0,0,0,.4)";

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }

  drawHueRing(){
    const ctx = this.state.ctx.wheel;
    const center = this.center();
    const radius1 = this.state.radius1;
    const radius2 = this.state.radius2;

    ctx.clearRect(0, 0, this.state.width, this.state.height);

    ctx.globalCompositeOperation = 'source-over';
    let hsl = this.state.color.hsl().object();
    for (let deg = 0; deg < 360; deg ++) {
      let color = Color.hsl(deg, hsl.s, hsl.l);
      ctx.fillStyle = color.rgb().string();
      ctx.strokeStyle = ctx.fillStyle;
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
       const x1 = center.x + (radius1 * 10) * Math.cos(deg * Math.PI / 180);
       const y1 = center.y + (radius1 * 10) * Math.sin(deg * Math.PI / 180);
       const x2 = center.x + (radius1 * 10) * Math.cos((deg + 1) * Math.PI / 180);
       const y2 = center.y + (radius1* 10) * Math.sin((deg + 1) * Math.PI / 180);
       ctx.lineTo(x1, y1);
       ctx.lineTo(x2, y2);
       ctx.closePath();
       ctx.fill();
       ctx.stroke(); // stroke covers up tiny gaps between slices caused by antialiasing
    }
    ctx.globalCompositeOperation = 'destination-in';

    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath();
		ctx.arc(center.x, center.y, radius2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius1, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

  }

  render () {
    return (
      <div style={{height:this.state.height, width:this.state.width}}>
        <canvas  ref="wheelShadow" width={this.state.width} height={this.state.height} ></canvas>
        <canvas  ref="wheel" width={this.state.width} height={this.state.height} ></canvas>
        <canvas ref="wheelControl" width={this.state.width} height={this.state.height} ></canvas>
      </div>
    )
  }
}

export default ColorWheel
