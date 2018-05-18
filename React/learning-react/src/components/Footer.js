import React from 'react';
import FilterLink from './FilterLink';
import RandomNumber from '../services/RandomNumber';

const randomInRange = new RandomNumber(10,20);

export default function Footer() {
  return (<p>
    Show:&nbsp;
    <FilterLink filter='SHOW_ALL'>All</FilterLink>,&nbsp;
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>,&nbsp;
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
    <h2>This is random number: {randomInRange.generate()}</h2>
  </p>)
}
