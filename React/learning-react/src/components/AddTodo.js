import React from 'react';

export default function AddTodo({ onAddTodo }) {
  let input;
  return (<div>
    <input ref={ref => input = ref} />
    <button onClick={() => { onAddTodo(input.value) }}>Add todo</button>
  </div>);
}
