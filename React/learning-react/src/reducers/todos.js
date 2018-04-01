
export default function todos(state = [], action) {
  switch (action.type) {
    case ('TOGGLE_TODO'):
      return state.map(x => {
        if (x.id !== action.id) {
          return x;
        }
        return {
          ...x,
          completed: !x.completed
        }
      })
    case ('ADD_TODO'):
      return [
        ...state,
        { text: action.text, id: action.id, completed: false }
      ]
    default:
      return state;
  }
}
