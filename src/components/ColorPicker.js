import React, { Component } from 'react';
import HSL from './HSL';
import Color from 'color';
import randomColor from '../helpers/RandomColor';

class ColorPicker extends Component {
  constructor(props){
    super(props);
    const heightRatio = 220 / 300;
    const maxWidth = 800;
    const width = props.window.width > maxWidth ? maxWidth : props.window.width;
    this.state = {
      color: Color(randomColor()),
      maxWidth: maxWidth,
      heightRatio: heightRatio,
      window: props.window,
      width: width,
      height: width * heightRatio
    }
  }

  componentWillReceiveProps(newProps){
    this.setState(prev => {
      prev.window = newProps.window;
      prev.width = newProps.window.width > prev.maxWidth ? prev.maxWidth : newProps.window.width;
      prev.height = prev.width * prev.heightRatio;
      return prev;
    })
  }

  changeColor(color){
    this.setState({
      color: color
    });
  }

  render(){
    return (
      <HSL
        passed={this.state}
        changeColor={this.changeColor.bind(this)} />
      )
  }
}

export default ColorPicker;
