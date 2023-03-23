export function someGetter(/* state */) {}

export function lastTodoId(state) {
  return state.todos[state.todos.length - 1].id;
}

export function allTodos(state) {
  return state.todos.filter((t) => !t.isDeleted);
}

export function pendingTodos(state) {
  return state.todos.filter((t) => t.isCompleted === false && !t.isDeleted);
}

export function completedTodos(state) {
  return state.todos.filter((t) => t.isCompleted === true && !t.isDeleted);
}
export function deletedTodos(state) {
  return state.todos.filter((t) => t.isDeleted === true);
}

export function getTodosByTab(_, getters) {
  return function (tab) {
    switch (tab.toLowerCase()) {
      case "all":
        return getters["allTodos"];
      case "pending":
        return getters["pendingTodos"];
      case "completed":
        return getters["completedTodos"];
      case "deleted":
        return getters["deletedTodos"];
    }
  };
}
