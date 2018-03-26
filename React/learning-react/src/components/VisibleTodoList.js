import TodoList from './TodoList';
import { connect } from 'react-redux';

const mapStateToProps = ({ visibilityFilter, todos }) => {
  return {
    todos: todos.filter(x => {
      return visibilityFilter === 'SHOW_ALL' ||
        (visibilityFilter === 'SHOW_COMPLETED' && x.completed) ||
        (visibilityFilter === 'SHOW_ACTIVE' && !x.completed);
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => dispatch({ type: 'TOGGLE_TODO', id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
