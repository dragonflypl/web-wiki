import React from 'react';
import { store } from './../redux';
import Link from './Link';

export default function FilterLink({ filter, children }) {
  return <Link
    active={store.getState().visibilityFilter === filter}
    onClick={() => store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })}>
    {children}
  </Link>
}
