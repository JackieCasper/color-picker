import React, { Component } from 'react';
import Color from 'color';

class Swatch extends Component {
  constructor(props){
    super()
    this.state = {
      ...props.passed,
      color: props.color,
      radius: props.radius,
    }
    this.center = props.center.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState(prev => {
      const newState = { ...prev, ...newProps.passed }
      newState.radius = newProps.radius;
      if (!newState.ctx){
        newState.ctx = this.refs.swatch.getContext('2d');
      }
      return newState
    }, this.updateCanvas.bind(this));
  }

  updateCanvas(){
    this.drawSwatch();
  }

  drawSwatch(){
    const ctx = this.state.ctx;
    const center = this.center();
    let radius = this.state.radius;

    ctx.clearRect(0,0,this.state.width,this.state.height);

    ctx.fillStyle = this.state.edge.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(0,0,0,.4)";

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    radius -= this.state.edge.size / 2;

    ctx.fillStyle = this.state.color.rgb().string();
    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0,0,0,0)";

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  render () {
    return (
      <canvas  ref="swatch" width={this.state.width} height={this.state.height} ></canvas>
    )
  }
}

export default Swatch
