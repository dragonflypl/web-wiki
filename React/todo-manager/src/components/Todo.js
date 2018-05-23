import React from 'react'

export default ({ onClick, completed, text }) => {
  return (<li
    style={{ cursor: 'pointer', textDecoration: completed ? 'line-through' : 'none' }}
    onClick={onClick}>{text}</li>);
}
