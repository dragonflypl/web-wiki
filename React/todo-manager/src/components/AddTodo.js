import React from 'react';
import { connect } from 'react-redux'

export default connect()(({ dispatch }) => {
  return (<div>
    <input ref={node => this.input = node} />
    <button onClick={() => {
      dispatch({
        type: 'ADD_TODO',
        id: Date.now(),
        text: this.input.value
      })
      this.input.value = ''
    }}>Add Todo</button>
  </div>)
})
