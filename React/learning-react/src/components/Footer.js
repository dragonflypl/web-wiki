import React from 'react';
import FilterLink from './FilterLink';

export default function Footer() {
  return (<p>
    Show:&nbsp;
    <FilterLink filter='all'>All</FilterLink>,&nbsp;
    <FilterLink filter='completed'>Completed</FilterLink>,&nbsp;
    <FilterLink filter='active'>Active</FilterLink>
  </p>)
}
