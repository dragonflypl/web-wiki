import React from 'react'
import { NavLink } from 'react-router-dom';

export default function FilterLink({ filter, ...rest }) {
  return <NavLink
    activeStyle={{ textDecoration: 'none' }}
    to={'/' + filter} {...rest} />
}
