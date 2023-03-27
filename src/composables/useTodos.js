import { useQuasar, Dark } from "quasar";
import { useRoute } from "vue-router";

import { computed, ref } from "vue";
import { useStore } from "vuex";

const useTodos = () => {
  const store = useStore();
  const $q = useQuasar();
  const $route = useRoute();

  const { sections } = store.state.todos;

  const { section } = $route.params;
  const tabHandle = sections.includes(section)
    ? section
    : sections.find((s) => s.name === "all");

  const currentTab = ref(tabHandle);
  const dialogFormTodo = ref(false);

  const actionForm = ref("");
  const todoForm = ref({
    title: "",
    text: "",
    createdAt: null,
    isDeleted: false,
    isCompleted: false,
  });

  const editTodo = (task) => {
    dialogFormTodo.value = true;
    actionForm.value = "edit";
    todoForm.value = { ...task };
  };

  const closeDialogForm = () => {
    actionForm.value = "";
    todoForm.value = {
      title: "",
      text: "",
      createdAt: null,
      isDeleted: false,
      isCompleted: false,
    };
    dialogFormTodo.value = false;
  };

  const createNewTodo = () => {
    actionForm.value = "create";
    dialogFormTodo.value = true;
  };

  const submitDialogForm = (action, todo) => {
    switch (action) {
      case "create":
        store.commit("todos/addNewTodo", {
          ...todo,
          id: store.getters["todos/lastTodoId"] + 1,
          createdAt: Date.now(),
        });
        break;
      case "edit":
        store.commit("todos/editTodo", { ...todo });
        break;
    }
    storeStateTodos();
    return;
  };

  const toggleTodo = (id) => {
    store.commit("todos/toggleTodo", id);
    storeStateTodos();
  };

  const alert = ({ title, text, createdAt }) => {
    const dateFormated = new Date(createdAt);
    const date = `${dateFormated.getDate()}/${dateFormated.getMonth()}/${dateFormated.getFullYear()}`;
    const time = `${dateFormated.getHours()}:${dateFormated.getMinutes()}:${dateFormated.getSeconds()}`;
    $q.dialog({
      dark: Dark.isActive,
      title: `${title} (${date} ${time})`,
      message: `${text}`,
    });
  };

  const toggleDeleteTodo = ({ title, text, id, isDeleted }) => {
    const titleDialog = isDeleted
      ? `Do you want to recover the todo: '${title}'?`
      : `Do you want to delete the todo: '${title}'?`;

    $q.dialog({
      dark: Dark.isActive,
      title: titleDialog,
      message: `${title} \n ${text}`,
      cancel: true,
      persistent: true,
    }).onOk(() => {
      store.commit("todos/toggleDeleteTodo", id);
      storeStateTodos();
      return;
    });
  };

  const storeStateTodos = () => {
    // console.log(store.state.todos.todos);
    localStorage.setItem("todos", JSON.stringify(store.state.todos.todos));
  };

  return {
    // State
    currentTab,
    dialogFormTodo,
    actionForm,
    todoForm,

    // Computed
    currentSectionCapitalized: computed(() => {
      return (
        currentTab.value.name.charAt(0).toUpperCase() +
        currentTab.value.name.slice(1)
      );
    }),
    all: computed(() => store.getters["todos/allTodos"]),
    getTodosByTab: computed(() =>
      store.getters["todos/getTodosByTab"](currentTab.value.name)
    ),

    // Methods
    alert,
    toggleDeleteTodo,
    toggleTodo,
    submitDialogForm,
    createNewTodo,
    editTodo,
    closeDialogForm,
    storeStateTodos,

    //Vuex
    sections,
  };
};

export default useTodos;
