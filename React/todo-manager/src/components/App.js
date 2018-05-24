import React from 'react';
import logo from './../logo.svg';
import './App.css';
import VisibleTodoList from './VisibleTodoList';
import AddTodo from './AddTodo'
import Footer from './Footer'

export default ({ match }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <hr />
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div >
  );
}
