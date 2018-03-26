import React from 'react';
import { store } from './../redux';
import TodoList from './TodoList';

export default function VisibleTodoList() {

  const { visibilityFilter, todos } = store.getState();

  const visibleTodos = todos.filter(x => {
    if (visibilityFilter === 'SHOW_ALL' ||
      (visibilityFilter === 'SHOW_COMPLETED' && x.completed) ||
      (visibilityFilter === 'SHOW_PENDING' && !x.completed)) {
      return x;
    }
    return undefined;
  })

  return (<TodoList onClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })} list={visibleTodos} />)
}
