import React from 'react';
import { store } from './../redux';
import TodoList from './TodoList';

export default function VisibleTodoList() {

  const { visibilityFilter, todos } = store.getState();

  const visibleTodos = todos.filter(x => {
    return visibilityFilter === 'SHOW_ALL' ||
      (visibilityFilter === 'SHOW_COMPLETED' && x.completed) ||
      (visibilityFilter === 'SHOW_ACTIVE' && !x.completed);
  })

  return <TodoList
    onTodoClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })}
    todos={visibleTodos}
  />
}
