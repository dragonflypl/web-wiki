import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './redux';

import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';

let id = 1;

class App extends Component {

  toggle = (id) => {
    store.dispatch({ type: 'TOGGLE_TODO', id })
  }

  addTodo = (value) => {
    store.dispatch({ type: 'ADD_TODO', text: value, id: id++ });
  }

  get visibleTodos() {
    const { visibilityFilter, todos } = this.props;

    return todos.filter(x => {
      if (visibilityFilter === 'SHOW_ALL' ||
        (visibilityFilter === 'SHOW_COMPLETED' && x.completed) ||
        (visibilityFilter === 'SHOW_PENDING' && !x.completed)) {
        return x;
      }
      return undefined;
    })
  }

  render() {

    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <AddTodo onAddTodo={this.addTodo} />
          <TodoList onClick={id => this.toggle(id)} list={this.visibleTodos} />
          <Footer />
        </div>
      </div >
    );
  }
}

export default App;
