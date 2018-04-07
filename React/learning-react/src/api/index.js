export default function fetchTodos(filter) {
  if (filter === 'completed') return fetch('todos?completed=true').then(response => response.json());
  if (filter === 'active') return fetch('todos?completed=false').then(response => response.json());
  return fetch('todos').then(response => response.json())
}
