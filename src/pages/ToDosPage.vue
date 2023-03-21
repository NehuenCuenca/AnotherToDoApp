<template>
    <div class="q-pa-md column ">
        <div class="row justify-center">
            <q-btn class="col-1" label="New todo" color="primary" @click="dialogNewTodo = true" />
        </div>

        <q-dialog v-model="dialogNewTodo">
            <q-layout view="Lhh lpR fff" container class="bg-white">
                <q-header class="bg-primary">
                    <q-toolbar>
                        <q-toolbar-title>Creating a new todo...</q-toolbar-title>
                        <q-btn flat v-close-popup round dense icon="las la-times-circle" @click="cleanNewTodo" />
                    </q-toolbar>
                </q-header>
                <q-page-container>
                    <q-page padding>
                        <form @submit.prevent="submitNewTodo" class="column wrap q-gutter-md items-center">
                            <q-input type="text" placeholder="Title" v-model="newTodo.title" required filled />
                            <q-input type="textarea" v-model="newTodo.text" cols="50" rows="10"
                                placeholder="Write a description for the todo" required filled />
                            <q-btn type="submit" label="Submit" color="primary" />
                        </form>
                    </q-page>
                </q-page-container>
            </q-layout>
        </q-dialog>

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

export default {
    name: 'todos-page',
    setup() {
        const {
            dialogNewTodo,
            currentTab,
            all,
            getTodosByTab,
            alert,
            toggleDeleteTodo,
            toggleTodo,
            submitNewTodo,
            cleanNewTodo,
            newTodo,
            sections,
            currentSectionCapitalized
        } = useTodos();

        return {
            dialogNewTodo,
            currentTab,
            all,
            getTodosByTab,
            alert,
            toggleDeleteTodo,
            toggleTodo,
            submitNewTodo,
            cleanNewTodo,
            newTodo,
            sections,
            currentSectionCapitalized
        }
    }
}
</script>

<style scoped>
.completed {
    text-decoration: line-through;
}
</style>