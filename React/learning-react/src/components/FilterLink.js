import React from 'react';

export default function FilterLink({ onClick, filter, children }) {
  return (<button onClick={() => onClick(filter)}>{children}</button>)
}
