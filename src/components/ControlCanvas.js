import React, { Component } from 'react';

class ControlCanvas extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...props.passed
    }
    this.center = props.center.bind(this);
  }


  componentWillReceiveProps(newProps){
    this.setState(prev => {
      prev = { ...prev, ...newProps.passed }
      if(!prev.ctx){
        prev.ctx = this.refs.control.getContext('2d')
      }
      return prev;
    }, () => {
      this.drawControl();
    })
  }

  drawControl(){
    const center = this.center();
    const ctx = this.state.ctx;

    const radius = this.state.radius < 0 ? this.state.radius * -1 : this.state.radius;
    const distance = this.state.distance;
    const widthDif = this.state.edge.size / 2;

    ctx.resetTransform();
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    ctx.translate(center.x, center.y);
    ctx.rotate( (this.state.angle * ( Math.PI / 180)) );

    ctx.fillStyle = this.state.edge.color;

    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(0,0,0,.4)";

    ctx.beginPath();
    ctx.arc(distance, 0, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    const color = this.state.color.rgb().string();
    ctx.fillStyle = color;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0,0,0,0)";
    ctx.beginPath();
    ctx.arc(distance, 0, radius - widthDif, 0, Math.PI * 2);
    ctx.closePath;
    ctx.fill();

  }

  render () {
    return (
      <canvas
        width={this.state.width}
        height={this.state.height}
        ref="control"
      ></canvas>
    )
  }
}

export default ControlCanvas
