import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import VisibleTodoList from './components/VisibleTodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';

class App extends Component {

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <hr />
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div >
    );
  }
}

export default App;
