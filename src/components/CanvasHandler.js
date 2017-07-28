import React, { Component } from 'react';

class CanvasHandler extends Component {
  constructor(props){
    super();

    this.state = {
      width: 300,
      height: 250,
      maxWidth: 600,
      heightRatio: 250 / 300,
      window: props.window,
      mouse: {
        x: 0,
        y: 0,
        down: false
      }
    }
  }

  componentDidMount(){
    this.setSize();
  }

  setSize(){
    const width = this.props.window.width > this.state.maxWidth ? this.state.maxWidth : this.props.window.width;
    this.setState({
      width: width,
      height: width * this.state.heightRatio
    })
  }

  center(){
    return {
      x: this.state.width / 2,
      y: this.state.height / 2
    }
  }

  componentWillReceiveProps(nextProps){
    this.setSize();
  }
}

export default CanvasHandler
