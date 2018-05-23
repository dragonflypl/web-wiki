const defaultState = [
  { id: 1, text: 'one' },
  { id: 2, text: 'two' },
  { id: 3, text: 'three', completed: true }
];

export const todos = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed
        }
      })
    default:
      return state;
  }
}
