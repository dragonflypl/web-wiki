import React from 'react';

export default ({ message, onRetry }) => {
  return <div>
    <p>Could not fetch todos: {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
}
