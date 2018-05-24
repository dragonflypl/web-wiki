import React from 'react';
import Todo from './Todo';

export default function TodoList({ todos, onTodoClick }) {
  return <ul>
    {todos.map(x =>
      <Todo {...x} key={x.id} onClick={() => onTodoClick(x)} />)}
  </ul>
}
