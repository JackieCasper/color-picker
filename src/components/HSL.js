import React, {Component} from 'react';
import Color from 'color';
import Swatch from './Swatch';
import ColorWheel from './ColorWheel';
import CurvedRange from './CurvedRange';
import HSLControls from './HSLControls';

class HSL extends Component {
  constructor(props){
    super(props);
    const swatchR = props.passed.height / 4
    const distance = props.passed.height / 14;
    const ringWidth = (props.passed.height / 6) - (props.passed.height / 14);
    const edge = ringWidth / 8;
    this.state = {
      ...props.passed,
      swatchRadius: swatchR,
      wheel: {
        r1: swatchR + distance,
        r2: swatchR + distance + ringWidth
      },
      edge: edge,
      curve: {
        s: {
          angle: {
            start: 130,
            end: 230
          },
          colorProp: 's'
        },
        l: {
          angle: {
            start: 310,
            end: 50
          },
          colorProp: 'l'
        },
        r1: swatchR + (distance * 2) + ringWidth,
        r2: swatchR + (distance * 2) + (ringWidth * 2)
      }
    }
  }

  componentWillReceiveProps(newProps){
    this.setState(prev => {
      prev = { ...prev, ...newProps.passed }
      const height = prev.width * this.state.heightRatio;
      prev.swatchRadius = height / 4;
      const distance = height / 18;
      const width = (height / 6) - (height / 14);
      const edge = width / 8;
      prev.edge = {
        size: edge,
        color: prev.color.hsl().object().l > 70 ? '#777' : '#FFF'
      }
      prev.wheel = {
        r1: prev.swatchRadius + distance,
        r2: prev.swatchRadius + distance + width
      },
      prev.curve = {
        ...prev.curve,
        r1: prev.swatchRadius + (distance * 2) + width,
        r2: prev.swatchRadius + (distance * 2) + (width * 2),
      }
      return prev;
    })
  }

  setColor(color){
    this.props.changeColor(color);
  }

  passedProps(){
    return {
      edge: this.state.edge,
      width: this.state.width,
      height: this.state.height,
      color: this.state.color,
    }
  }

  center(){
    return {
      x: this.state.width / 2,
      y: this.state.height / 2
    }
  }

  render () {
    return(
      <div className="canvas-container">
        <ColorWheel passed={{...this.passedProps()}}
          center={this.center}
          radius1={this.state.wheel.r1}
          radius2={this.state.wheel.r2}
        />
        <CurvedRange {...this.state.curve.l}
          passed={{...this.passedProps()}}
          center={this.center}
          radius1={this.state.curve.r1}
          radius2 = {this.state.curve.r2}
        />

        <CurvedRange {...this.state.curve.s}
          passed={{...this.passedProps()}}
          center={this.center}
          radius1={this.state.curve.r1}
          radius2 = {this.state.curve.r2}
        />
        <Swatch passed={{...this.passedProps()}}
          center={this.center}
          radius={this.state.swatchRadius} />
        <HSLControls passed={{
            ...this.passedProps(),
            curve: {...this.state.curve},
            wheel: {...this.state.wheel}
          }}
          center={this.center}
          setColor={this.setColor.bind(this)}
        />
      </div>
    )
  }
}


export default HSL;
