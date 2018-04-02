import TodoList from './TodoList';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';

const mapStateToProps = ({ todos }, { visibilityFilter }) => {
  return {
    todos: todos.filter(x => {
      return (visibilityFilter === 'all' || !visibilityFilter) ||
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
