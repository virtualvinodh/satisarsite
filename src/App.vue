<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="font-serif">
          Satisar
        </q-toolbar-title>

        <q-btn flat round icon="translate" @click="cycleLanguage" />
        <q-btn flat round icon="share" to="/studio" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-parchment-light"
    >
      <q-list>
        <q-item-label header class="text-primary font-bold uppercase tracking-wider">
          Portal
        </q-item-label>

        <q-item clickable v-ripple to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/studio">
          <q-item-section avatar><q-icon name="photo_camera" /></q-item-section>
          <q-item-section>Image Studio</q-item-section>
        </q-item>

        <q-item-label header class="text-primary font-bold uppercase tracking-wider q-mt-md">
          Learning
        </q-item-label>

        <q-item clickable v-ripple to="/learn">
          <q-item-section avatar><q-icon name="school" /></q-item-section>
          <q-item-section>Learning Path</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/glossary">
          <q-item-section avatar><q-icon name="list_alt" /></q-item-section>
          <q-item-section>Visual Glossary</q-item-section>
        </q-item>

        <q-item-label header class="text-primary font-bold uppercase tracking-wider q-mt-md">
          Practice
        </q-item-label>

        <q-item clickable v-ripple to="/reading">
          <q-item-section avatar><q-icon name="auto_stories" /></q-item-section>
          <q-item-section>Reading Room</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/books">
          <q-item-section avatar><q-icon name="library_books" /></q-item-section>
          <q-item-section>Library</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/game/match">
          <q-item-section avatar><q-icon name="extension" /></q-item-section>
          <q-item-section>Match Game</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/game/memory">
          <q-item-section avatar><q-icon name="grid_view" /></q-item-section>
          <q-item-section>Memory Game</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/game/flip">
          <q-item-section avatar><q-icon name="style" /></q-item-section>
          <q-item-section>Flip Cards</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/worksheets">
          <q-item-section avatar><q-icon name="print" /></q-item-section>
          <q-item-section>Worksheets</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

const { locale } = useI18n()
const $q = useQuasar()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function cycleLanguage() {
  const langs = ['en', 'hi', 'ks']
  const nextIndex = (langs.indexOf(locale.value) + 1) % langs.length
  locale.value = langs[nextIndex]
  $q.localStorage.set('locale', locale.value)
}
</script>

<style>
.font-serif {
  font-family: 'Georgia', serif;
}
</style>
