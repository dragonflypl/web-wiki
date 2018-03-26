import React from 'react';

export default function Link({ active, onClick, children }) {
  if (active) {
    return children;
  }
  return <a href="#" onClick={onClick}>{children}</a>
}
