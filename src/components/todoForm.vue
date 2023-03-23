<template>
    <q-dialog @hide="closeDialog">
        <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header class="bg-primary">
                <q-toolbar>
                    <q-toolbar-title>{{ titleDialog }}</q-toolbar-title>
                    <q-btn @click="closeDialog" flat v-close-popup round dense icon="las la-times-circle" />
                </q-toolbar>
            </q-header>

            <q-page-container>
                <q-page padding>
                    <form @submit.prevent="localSubmit" class="column wrap q-gutter-md items-center">
                        <q-input type="text" v-model="localTodo.title" placeholder="Title" required filled />
                        <q-input type="textarea" v-model="localTodo.text" cols="50" rows="10" required filled />
                        <q-btn type="submit" label="Submit" color="primary" />
                    </form>
                </q-page>
            </q-page-container>
        </q-layout>
    </q-dialog>
</template>

<script >
import { computed, toRef } from 'vue'
import useTodos from '../composables/useTodos'

export default {
    name: 'todoForm',
    emits: ['closeDialog'],
    props: {
        action: {
            type: String,
            required: true
        },

        todo: {
            type: Object,
            default() {
                return {
                    title: "",
                    text: "",
                    createdAt: "mm/dd/yy",
                    isDeleted: false,
                    isCompleted: false,
                }
            }
        }

    },


    setup(props, ctx) {

        const {
            submitDialogForm,
        } = useTodos();

        const titleDialog = computed(() => (props.action === 'create' ? 'Creating a new todo' : 'Editing a todo'));

        const localTodo = toRef(props, 'todo')

        const closeDialog = () => { ctx.emit('closeDialog') }
        const localSubmit = () => {
            submitDialogForm(props.action, localTodo.value)
            closeDialog()
        }


        return {
            titleDialog,
            submitDialogForm,
            closeDialog,
            localTodo,
            localSubmit,
        }
    }
}
</script>

<style lang="scss" scoped></style>