import React from 'react'
import { connect } from 'react-redux';

const Link = ({ active, onClick, children }) => {
  if (active) {
    return <span>{children}</span>
  }
  return <a href="#"
    onClick={e => {
      e.preventDefault();
      onClick();
    }}>{children}</a>
}

function mapStateToProps(state, ownProps) {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: ownProps.filter
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Link)
