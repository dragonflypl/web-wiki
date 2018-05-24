import TodoList from './TodoList';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { toggleTodo, fetchTodos } from './../actions';
import { getErrorMessage, getVisibleTodos, getIsFetching } from './../reducers'
import React from 'react';
import FetchError from './FetchError';

class VisibleTodoList extends React.Component {

  fetch() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }
  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetch();
    }
  }

  render() {
    const { isFetching, errorMessage, ...rest } = this.props;
    if (isFetching) {
      return <p>Loading...</p>
    }
    if (errorMessage) {
      return <FetchError message={errorMessage} />
    }
    return <TodoList {...rest} />
  }
}

const mapStateToProps = (state, { match }) => ({
  errorMessage: getErrorMessage(state),
  isFetching: getIsFetching(state),
  filter: match.params.filter,
  todos: getVisibleTodos(state, match.params.filter)
})

const mapDispatchToProps = {
  onTodoClick: toggleTodo,
  fetchTodos
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList));
