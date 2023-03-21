import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

import { computed, ref } from "vue";
import { useStore } from "vuex";

const useTodos = () => {
  const store = useStore();
  const $q = useQuasar();
  const $route = useRoute();

  const { sections } = store.state.todos;

  const tabInRoute = $route.params?.section;
  const tabHandle = sections.includes(tabInRoute)
    ? tabInRoute
    : sections.find((s) => s.name === "all");

  const currentTab = ref(tabHandle);
  const dialogNewTodo = ref(false);
  const newTodo = ref({
    title: "",
    text: "",
    createdAt: "mm/dd/yy",
    isDeleted: false,
    isCompleted: false,
  });

  const cleanNewTodo = () => {
    newTodo.value = {
      title: "",
      text: "",
      createdAt: "mm/dd/yy",
      isDeleted: false,
      isCompleted: false,
    };
  };

  const submitNewTodo = () => {
    store.commit("todos/addNewTodo", newTodo.value);
    dialogNewTodo.value = false;
    cleanNewTodo();
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
    dialogNewTodo,
    newTodo,

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
    submitNewTodo,
    cleanNewTodo,

    //Vuex
    sections,
  };
};

export default useTodos;
