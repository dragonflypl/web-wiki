import { connect } from 'react-redux'
import Link from './Link';

const mapStateToProps = (state, { filter }) => {
  return {
    active: state.visibilityFilter === filter
  }
}

const mapDispatchToProps = (dispatch, { filter }) => {
  return {
    onClick: () => dispatch({ type: 'SET_VISIBILITY_FILTER', filter })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Link);
