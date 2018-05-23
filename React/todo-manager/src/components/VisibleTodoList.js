import TodoList from './TodoList';
import { connect } from 'react-redux'

function getVisibleTodos(todos, filter) {
  return todos.filter(todo => {
    return filter === 'SHOW_ALL' ||
      (filter === 'SHOW_COMPLETED' && todo.completed) ||
      (filter === 'SHOW_ACTIVE' && !todo.completed)
  })
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: id => dispatch({
      type: 'TOGGLE_TODO',
      id
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
