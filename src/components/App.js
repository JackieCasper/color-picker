import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import ColorPicker from './ColorPicker';


class App extends Component {
  constructor(){
    super();
    this.state = {
      window: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }

  componentDidMount(){
    this.setWindowSize();
    window.addEventListener('resize', this.setWindowSize.bind(this));
  }

  setWindowSize(){
    this.setState(prev => {
      prev.window.width = window.innerWidth;
      prev.window.height = window.innerHeight;
      return prev;
    });
  }

  render() {
    return (
      <div className="App" >
        <ColorPicker
          window={this.state.window} />
      </div>
    );
  }
}

export default App;
