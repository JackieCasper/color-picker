import React, { Component } from 'react';
import Color from 'color';

class CurvedRange extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...props.passed,
      radius1: props.radius1,
      radius2: props.radius2,
      angle: props.angle,
      value: props.value,
      colorProp: props.colorProp
    }
    this.center = props.center.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState(prev => {
      const newState = { ...prev, ...newProps.passed }
      newState.radius1 = newProps.radius1;
      newState.radius2 = newProps.radius2;
      if(!newState.ctx){
        newState.ctx = {
          curve:this.refs.curve.getContext('2d'),
          shadow: this.refs.shadow.getContext('2d')
        }
      }
      return newState
    }, this.updateCanvas.bind(this))
  }

  updateCanvas(){
    this.drawShadow();
    this.drawCurve();
    this.drawCurve();
  }

  drawCurve(){
    const start = this.state.angle.start * Math.PI / 180;
    const end = this.state.angle.end * Math.PI / 180;
    const radius1 = this.state.radius1;
    const radius2 = this.state.radius2;
    const width = radius2 - radius1;
    const center = this.center();
    const ctx = this.state.ctx.curve;

    ctx.clearRect(0, 0, this.state.width, this.state.height);

    ctx.globalCompositeOperation = "source-over";


    for (let i = 0; i < 100; i ++) {
      const deg = i + (start / (Math.PI / 180));
      let hsl = {...this.state.color.hsl().object()};
      hsl[this.state.colorProp] = i;
      let color = Color.hsl(hsl).rgb().string()
      ctx.fillStyle = color
      ctx.strokeStyle = ctx.fillStyle;
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
       const x1 = center.x + (radius1 * 10) * Math.cos(deg * Math.PI / 180);
       const y1 = center.y + (radius1 * 10) * Math.sin(deg * Math.PI / 180);
       const x2 = center.x + (radius1 * 10) * Math.cos((deg + 1) * Math.PI / 180);
       const y2 = center.y + (radius1 * 10) * Math.sin((deg + 1) * Math.PI / 180);
       ctx.lineTo(x1, y1);
       ctx.lineTo(x2, y2);
       ctx.closePath();
       ctx.fill();
       ctx.stroke(); // stroke covers up tiny gaps between slices caused by antialiasing
    }
    ctx.globalCompositeOperation = 'destination-in';

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap= "round";
    ctx.fillStyle = '#fff'
    ctx.arc(center.x, center.y, (radius2 + radius1) / 2, start, end, false);
    ctx.stroke();
  }

  drawShadow(){
    const start = this.state.angle.start * Math.PI / 180;
		const end = this.state.angle.end * Math.PI / 180;
    const radius1 = this.state.radius1;
    const radius2 = this.state.radius2;
    const width = radius2 - radius1;
    const center = this.center();
    const ctx = this.state.ctx.shadow;

    ctx.clearRect(0, 0, this.state.width, this.state.height);


    ctx.globalCompositeOperation = "source-over";

    ctx.beginPath();
    ctx.lineWidth = width + this.state.edge.size;
    ctx.strokeStyle = this.state.edge.color;
    ctx.lineCap= "round";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0,0,0,.4)";
		ctx.arc(center.x, center.y, (radius2 + radius1) /2, start, end, false);
    ctx.stroke();
  }

  render () {
    return(
      <div style={{height:this.state.height, width:this.state.width}}>
        <canvas  ref="shadow" width={this.state.width} height={this.state.height} ></canvas>
        <canvas  ref="curve" width={this.state.width} height={this.state.height} ></canvas>
      </div>
    )
  }
}

export default CurvedRange
