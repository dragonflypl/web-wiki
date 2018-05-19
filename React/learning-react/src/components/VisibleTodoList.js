import TodoList from './TodoList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { toggleTodo, fetchTodos } from '../actions';
import { getVisibleTodos, getIsFetching } from '../reducers';
import React from 'react';

class VisibleTodoList extends React.Component {

  getTodos() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter)
  }

  componentDidMount() {
    this.getTodos();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.getTodos();
    }
  }

  render() {
    if (this.props.isFetching) {
      return <h1>Fetching...</h1>
    }
    return <TodoList {...this.props} />
  }
}

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter),
  isFetching: getIsFetching(state),
  filter: match.params.filter,
})

const mapDispatchToProps = {
  onTodoClick: toggleTodo,
  fetchTodos,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList));
