<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="las la-bars" aria-label="Menu" @click="toggleDrawer" />

        <q-toolbar-title>
          AnotherToDoApp
        </q-toolbar-title>

        <q-btn flat round dense icon="las la-adjust" @click="toggleTheme" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="showDrawer" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu links
        </q-item-label>
        <q-separator />

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { linksList } from '../router/links-list'
import useUserSettings from 'src/composables/useUserSettings'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {

    const showDrawer = ref(false)

    const { toggleTheme } = useUserSettings()


    return {
      showDrawer,
      linksList,
      toggleDrawer: () => {
        showDrawer.value = !showDrawer.value
      },
      toggleTheme
    }
  }
})
</script>
