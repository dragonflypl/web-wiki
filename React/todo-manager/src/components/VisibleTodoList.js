import TodoList from './TodoList';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { toggleTodo } from './../actions';

function getVisibleTodos(todos, filter) {
  return todos.filter(todo => {
    return !filter ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'active' && !todo.completed)
  })
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      ownProps.match.params.filter
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));
