import React, { Component } from 'react';
import HSL from './HSL';
import Color from 'color';
import randomColor from '../helpers/RandomColor';

class ColorPicker extends Component {
  constructor(props){
    super(props);
    const heightRatio = 220 / 300;
    const maxWidth = 800;
    let width = props.window.width > maxWidth ? maxWidth : props.window.width;
    let height = width * heightRatio;
    if(props.window.height < height){
      height = props.window.height - 20;
      width = height / heightRatio;
    }
    this.state = {
      color: Color(randomColor()),
      maxWidth: maxWidth,
      heightRatio: heightRatio,
      window: props.window,
      width: width,
      height: height
    }
  }

  componentWillReceiveProps(newProps){
    this.setState(prev => {
      let width = newProps.window.width > prev.maxWidth ? prev.maxWidth : newProps.window.width;
      let height = width * prev.heightRatio;
      if(newProps.window.height < height){
        height = newProps.window.height - 20;
        width = height / prev.heightRatio;
      }
      prev.window = newProps.window;
      prev.width = width;
      prev.height = height;
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
