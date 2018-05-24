import TodoList from './TodoList';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { toggleTodo } from './../actions';
import { getVisibleTodos } from './../reducers'

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter)
})

export default withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));
