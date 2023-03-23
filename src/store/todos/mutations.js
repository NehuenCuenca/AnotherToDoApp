export function someMutation(/* state */) {}

export function addNewTodo(state, newTodo) {
  state.todos = [...state.todos, newTodo];
}

export function editTodo(state, todo) {
  const todoToEdit = state.todos.find((t) => t.id === todo.id);
  Object.assign(todoToEdit, { ...todo });
}

export function toggleTodo(state, idTodo) {
  const todo = state.todos.find((t) => t.id === idTodo);
  todo.isCompleted = !todo.isCompleted;
}

export function toggleDeleteTodo(state, idTodo) {
  const todo = state.todos.find((t) => t.id === idTodo);
  todo.isDeleted = !todo.isDeleted;
}
