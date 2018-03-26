import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return ([
      <div key="app" className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>,
      <ul key="list">
        {this.props.todos.map(x => <li key="x.id">{x.text}</li>)}
      </ul>
    ]
    );
  }
}

export default App;
