import TodoList from './TodoList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { toggleTodo, receiveTodos } from '../actions';
import { getVisibleTodos } from '../reducers';
import fetchTodos from '../api';
import React from 'react';

class VisibleTodoList extends React.Component {

  getTodos() {
    const { filter, receiveTodos } = this.props;

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
    return <TodoList {...this.props} />
  }
}

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter),
  filter: match.params.filter
})

const mapDispatchToProps = {
  onTodoClick: toggleTodo,
  receiveTodos
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList));
