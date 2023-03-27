<template>
    <q-dialog @hide="closeDialog">
        <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header :class="'bg-' + colorByAction">
                <q-toolbar>
                    <q-toolbar-title>{{ titleDialog }}</q-toolbar-title>
                    <q-btn @click="closeDialog" flat v-close-popup round dense icon="las la-times-circle" />
                </q-toolbar>
            </q-header>

            <q-page-container>
                <q-page padding>
                    <q-form @submit.prevent="localSubmit" class="column wrap q-gutter-md items-center">
                        <q-input type="text" v-model="localTodo.title" label="Title" outlined required no-error-icon
                            lazy-rules :rules="[fiveCharactersMinimum]" placeholder="Write an awesome title"
                            :dark="false" />
                        <q-input type="textarea" cols="50" rows="10" v-model="localTodo.text" label="Description" outlined
                            required no-error-icon lazy-rules :rules="[fiveCharactersMinimum]"
                            placeholder="Write an awesome to do" :dark="false" />
                        <q-btn type="submit" :label="btnSubmitDialog" :color="colorByAction" />
                    </q-form>
                </q-page>
            </q-page-container>
        </q-layout>
    </q-dialog>
</template>

<script >
import { Dark } from 'quasar'
import { computed, toRef, onUpdated } from 'vue'
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

        const titleDialog = computed(() => (props.action === 'create' ? '💭 Creating a new todo...' : '🔨 Editing a todo...'));
        const btnSubmitDialog = computed(() => (props.action === 'create' ? 'Save new todo' : 'Save edited todo'));
        const colorByAction = computed(() => (props.action === 'create' ? 'primary' : 'positive'));

        const localTodo = toRef(props, 'todo')

        const closeDialog = () => { ctx.emit('closeDialog') }
        const localSubmit = () => {
            submitDialogForm(props.action, localTodo.value)
            closeDialog()
        }

        const fiveCharactersMinimum = val => (val && val.length >= 5) || 'Please use maximum 5 characters'


        return {
            titleDialog,
            btnSubmitDialog,
            colorByAction,
            submitDialogForm,
            closeDialog,
            localTodo,
            localSubmit,
            fiveCharactersMinimum,
            isDarkModeActive: () => Dark.isActive
        }
    }
}
</script>

<style lang="scss" scoped></style>