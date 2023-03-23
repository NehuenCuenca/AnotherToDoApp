<template>
    <div class="q-pa-md column ">
        <div class="row justify-center">
            <q-btn class="col-1" label="New todo" color="primary" @click="createNewTodo" />
        </div>

        <todoForm :action="actionForm" :todo="todoForm" v-model="dialogFormTodo" @closeDialog="closeDialogForm" />

        <div class="q-mt-md row justify-center">
            <q-btn-group spread class="col-8">
                <q-btn v-for="({ name, navColor, navIcon }, indexSection) in sections" :key="indexSection" :label="name"
                    :color="navColor" :icon="navIcon" @click="currentTab = sections[indexSection]" />
            </q-btn-group>
        </div>

        <!--         <div class="q-pa-md" style="max-width: 450px"> -->
        <div class="q-mt-md row justify-center">
            <div class="col-10">
                <q-toolbar :class="'bg-' + currentTab.navColor + ' text-white shadow-2'">
                    <q-toolbar-title>{{ currentSectionCapitalized }} todos</q-toolbar-title>
                </q-toolbar>
                <q-list bordered separator>
                    <q-item v-for="todo in getTodosByTab" :key="todo.id" clickable v-ripple>
                        <q-item-section>
                            <q-item-label :class="(todo.isCompleted) ? 'completed' : ''">{{ todo.title }}</q-item-label>
                            <q-item-label caption>{{ todo.createdAt }}</q-item-label>
                        </q-item-section>
                        <q-item-section top side>
                            <div class="text-grey-8 q-gutter-xs">
                                <template v-if="!todo.isDeleted">
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="las la-eye"
                                        @click="alert(todo)" />

                                    <q-btn class="gt-xs" size="12px" flat dense round
                                        :icon="(todo.isCompleted) ? 'las la-undo' : 'las la-check'"
                                        @click="toggleTodo(todo.id)" />
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="las la-trash"
                                        @click="toggleDeleteTodo(todo)" />
                                    <q-btn class="gt-xs" size="12px" flat dense round icon="las la-edit"
                                        @click="editTodo(todo)" />
                                </template>
                                <q-btn class="gt-xs" size="12px" flat dense round icon="las la-sync"
                                    @click="toggleDeleteTodo(todo)" v-if="todo.isDeleted" />
                            </div>
                        </q-item-section>
                    </q-item>
                    <q-item v-if="getTodosByTab.length == 0" v-ripple>
                        <q-item-section>
                            <q-item-label>No todos in this section</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </div>
</template>

<script>
import useTodos from '../composables/useTodos'
import todoForm from '../components/todoForm.vue'

export default {
    name: 'todos-page',
    components: {
        todoForm
    },
    setup() {
        const {
            dialogFormTodo,
            currentTab,
            all,
            getTodosByTab,
            alert,
            toggleDeleteTodo,
            toggleTodo,
            sections,
            currentSectionCapitalized,
            actionForm,
            todoForm,
            createNewTodo,
            editTodo,
            closeDialogForm
        } = useTodos();

        return {
            dialogFormTodo,
            closeDialogForm,
            currentTab,
            all,
            getTodosByTab,
            alert,
            toggleDeleteTodo,
            toggleTodo,
            sections,
            currentSectionCapitalized,
            actionForm,
            todoForm,
            createNewTodo,
            editTodo
        }
    }
}
</script>

<style scoped>
.completed {
    text-decoration: line-through;
}
</style>