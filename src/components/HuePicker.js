import React, { Component } from 'react';

class HuePicker extends Component {
  constructor(props){
    super();
    this.state = {
      color: {
        h: 0,
        s: 0,
        v: 0
      },
      mouse: {
        x: 0,
        y: 0,
        down: false
      },
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      canvas: {
        width
      }
    }
  }

  componentDidMount(){
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateCanvas()
  }

  initCanvas(){
    this.setState((prev) => {
      prev.canvas ={
        ctx = this.refs.huePicker.getContext('2d')
      }
      return prev
    })
  }

  updateCanvas() {
    const ctx = this.refs.huePicker.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 30, 300);
    gradient.addColorStop(0, 'rgb(255, 0, 0)');
    gradient.addColorStop(1 / 6, 'rgb(255, 255, 0)');
    gradient.addColorStop(2 / 6, 'rgb(0, 255, 0)');
    gradient.addColorStop(3 / 6, 'rgb(0, 255, 255)');
    gradient.addColorStop(4 / 6, 'rgb(0, 0, 255)');
    gradient.addColorStop(5 / 6, 'rgb(255, 0, 255)');
    gradient.addColorStop(1, 'rgb(255, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 30, 300);
  }

  getColor(e){
    const ctx = e.target.getContext('2d');
    console.log(ctx)
  }

  render(){
    return (
      <canvas className="hue-picker" ref="huePicker" width={30} height={300} onMouseDown={(e)=>{this.getColor(e)}}></canvas>
    )
  }
}

export default HuePicker;
