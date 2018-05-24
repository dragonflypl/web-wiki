export function fetchTodos(filter) {
  if (filter === 'completed') return fetch('todos?completed=true').then(response => response.json());
  if (filter === 'active') return fetch('todos?completed=false').then(response => response.json());
  return fetch('todos').then(response => response.json())
}

export function toggleTodo(todo) {
  const { id, ...rest } = todo;

  return fetch('todos/' + id, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...rest,
      'completed': !rest.completed
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return data;
  });
}

export function addTodo(text) {
  return fetch('todos', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      completed: false
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return data;
  });
}
