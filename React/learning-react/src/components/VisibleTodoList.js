import TodoList from './TodoList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { toggleTodo, receiveTodos, requestTodos } from '../actions';
import { getVisibleTodos, getIsFetching } from '../reducers';
import fetchTodos from '../api';
import React from 'react';

class VisibleTodoList extends React.Component {

  getTodos() {
    const { filter, receiveTodos, requestTodos } = this.props;

    requestTodos();
    fetchTodos(filter).then(response => {
      receiveTodos(filter, response);
    })
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
  receiveTodos,
  requestTodos
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList));
