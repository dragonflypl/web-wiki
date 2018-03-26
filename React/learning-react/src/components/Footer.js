import React from 'react';
import FilterLink from './FilterLink';

export default function Footer() {
  return (<p>
    Show:&nbsp;
    <FilterLink filter='SHOW_ALL'>All</FilterLink>,&nbsp;
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>,&nbsp;
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
  </p>)
}
