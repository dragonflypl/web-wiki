import TodoList from './TodoList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { toggleTodo } from '../actions';

const mapStateToProps = ({ todos }, { match }) => {
  const visibilityFilter = match.params.filter || 'all';
  return {
    todos: todos.filter(x => {
      return (visibilityFilter === 'all') ||
        (visibilityFilter === 'completed' && x.completed) ||
        (visibilityFilter === 'active' && !x.completed);
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => dispatch(toggleTodo(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));
