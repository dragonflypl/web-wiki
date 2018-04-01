import { connect } from 'react-redux'
import Link from './Link';
import { setVisibilityFilter } from '../actions';

const mapStateToProps = (state, { filter }) => {
  return {
    active: state.visibilityFilter === filter
  }
}

const mapDispatchToProps = (dispatch, { filter }) => {
  return {
    onClick: () => dispatch(setVisibilityFilter(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Link);
