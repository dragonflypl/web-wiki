import React from 'react'
import { Link } from 'react-router-dom';

export default ({ filter, children }) => (
  <Link
    to={filter === 'all' ? '' : filter}
    activeStyle={{ textDecoration: 'none' }}>
    {children}
  </Link>
)
