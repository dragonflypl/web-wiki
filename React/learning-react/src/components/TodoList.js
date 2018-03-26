import React from 'react';
import Todo from './Todo';

export default function TodoList({ list, onClick }) {
  return (<ul>
    {list.map(x => <Todo onClick={() => onClick(x.id)} {...x} />)}
  </ul>)
}
