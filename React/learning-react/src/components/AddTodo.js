import React from 'react';
import { connect } from 'react-redux';
let id = 1;

function AddTodo({ dispatch }) {
  let input;
  return (<div>
    <input ref={ref => input = ref} />
    <button onClick={() => dispatch({ type: 'ADD_TODO', text: input.value, id: id++ })}>Add todo</button>
  </div>);
}

export default connect()(AddTodo);
