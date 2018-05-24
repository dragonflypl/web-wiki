import React from 'react';
import { connect } from 'react-redux'
import { addTodo } from './../actions'

const AddTodo = ({ onClick }) => {
  return (<div>
    <input ref={node => this.input = node} />
    <button onClick={() => {
      if (this.input.value) {
        onClick(this.input.value);
        this.input.value = '';
      }
    }}>Add Todo</button>
  </div>)
};

export default connect(null, {
  onClick: addTodo
})(AddTodo)
