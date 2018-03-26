import React from 'react';

export default function Link({ active, onClick, children }) {
  if (active) {
    return children;
  }
  return <button type="button" onClick={onClick}>{children}</button>
}
