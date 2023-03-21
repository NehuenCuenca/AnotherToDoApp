export function someMutation(/* state */) {}

export function addNewTodo(state, newTodo) {
  state.todos = [...state.todos, newTodo];
}

export function toggleTodo(state, idTodo) {
  const todo = state.todos.find((t) => t.id === idTodo);
  todo.isCompleted = !todo.isCompleted;
}

export function toggleDeleteTodo(state, idTodo) {
  const todo = state.todos.find((t) => t.id === idTodo);
  todo.isDeleted = !todo.isDeleted;
}
