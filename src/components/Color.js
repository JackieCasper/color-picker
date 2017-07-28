import React, { Component } from 'react';
import CanvasHandler from './CanvasHandler';

class Color extends CanvasHandler {
  constructor(props){
    super(props);
  }
  render () {
    return this.renderCanvas(null, {ref: 'color'})
  }
}

export default Color
