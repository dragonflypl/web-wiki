import React from 'react';
import { connect } from 'react-redux'
import { addTodo } from './../actions'

const AddTodo = ({ addTodo }) => {
  let input;
  return (<div>
    <input ref={node => input = node} />
    <button onClick={() => {
      if (input.value) return;
      addTodo(this.input.value);
      this.input.value = '';
    }}>Add Todo</button>
  </div>)
};

export default connect(null, { addTodo })(AddTodo)
