import React from 'react';
import FilterLink from './FilterLink';

export default function Footer() {
  return (<p>
    <FilterLink filter='SHOW_ALL'>Show All</FilterLink> ,&nbsp;
    <FilterLink filter='SHOW_COMPLETED'>Done</FilterLink> ,&nbsp;
    <FilterLink filter='SHOW_PENDING'>Pending</FilterLink>
  </p>)
}
