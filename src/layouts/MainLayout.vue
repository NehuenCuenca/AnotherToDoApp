<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="las la-bars" aria-label="Menu" @click="toggleDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <!-- TODO: <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="showDrawer" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { linksList } from '../router/links-list'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {

    const showDrawer = ref(false)

    return {
      showDrawer,
      linksList,
      toggleDrawer: () => {
        showDrawer.value = !showDrawer.value
      }
    }
  }
})
</script>
