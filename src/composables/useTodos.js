import { useQuasar } from "quasar";
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
    createdAt: "mm/dd/yy",
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
      createdAt: "mm/dd/yy",
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
          id: store.getters["todos/lastTodoId"] + 1,
          ...todo,
        });
        break;
      case "edit":
        store.commit("todos/editTodo", { ...todo });
        break;
    }
    return;
  };

  const toggleTodo = (id) => {
    store.commit("todos/toggleTodo", id);
  };
  const alert = ({ title, text, createdAt }) => {
    $q.dialog({
      title: `${title} (${createdAt})`,
      message: `${text}`,
    });
  };
  const toggleDeleteTodo = ({ title, text, id, isDeleted }) => {
    const titleDialog = !isDeleted
      ? "Are you sure to delete this todo?"
      : "Are you sure to recover this todo?";

    $q.dialog({
      title: titleDialog,
      message: `${title} \n ${text}`,
      cancel: true,
      persistent: true,
    }).onOk(() => {
      store.commit("todos/toggleDeleteTodo", id);
      return;
    });
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
    titleActionForm: computed(() => {
      return actionForm.value === "create"
        ? "Creating a new todo..."
        : "Editing a todo...";
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

    //Vuex
    sections,
  };
};

export default useTodos;
