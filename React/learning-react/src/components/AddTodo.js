import React from 'react';
import { store } from './../redux';
let id = 1;

export default function AddTodo({ onAddTodo }) {
  let input;
  return (<div>
    <input ref={ref => input = ref} />
    <button onClick={() => store.dispatch({ type: 'ADD_TODO', text: input.value, id: id++ })}>Add todo</button>
  </div>);
}
