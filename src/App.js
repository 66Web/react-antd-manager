/**路由入口组件 */

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>
           {this.props.children}
        </div>
    );
  }
}

export default App;
