export default function fetchTodos(filter) {
  if (filter === 'completed') return fetch('todos?completed=true');
  if (filter === 'active') return fetch('todos?completed=false');
  return fetch('todos')
}
