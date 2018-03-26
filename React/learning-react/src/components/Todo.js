import React from 'react';

export default function Todo({ onClick, text, completed }) {
  const style = {
    textDecoration: completed ? 'line-through' : 'none'
  };
  return <li onClick={onClick} style={style}>{text}</li>
}
