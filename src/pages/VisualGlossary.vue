<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Sharada Script Glossary</h1>

      <div v-for="(section, key) in glossaryData" :key="key" class="mb-8">
        <h2 class="text-xl font-semibold text-primary mb-4 border-b-2 border-primary/20 pb-2">
          {{ formatTitle(key) }}
        </h2>
        <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
          <div
            v-for="char in section"
            :key="char"
            class="bg-white p-4 rounded shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center cursor-pointer group"
            @click="showDetails(char)"
          >
            <div class="sharada text-4xl mb-2 group-hover:scale-110 transition-transform">{{ char }}</div>
            <div class="text-xs text-grey-6 uppercase">{{ transliterate(char) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Dialog -->
    <q-dialog v-model="showDialog">
      <q-card class="bg-parchment p-4 min-w-[300px]">
        <q-card-section class="flex flex-col items-center">
          <div class="sharada text-8xl mb-4">{{ selectedChar }}</div>
          <div class="text-2xl font-bold text-primary">{{ transliterate(selectedChar) }}</div>
          <p class="text-grey-7 mt-2">Practice tracing this character below:</p>
          <TracingBoard :char="selectedChar" :size="250" class="mt-4" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import characters from '../data/content/characters.json'
import { TransliterationService } from '../services/TransliterationService'
import TracingBoard from '../components/TracingBoard.vue'

const glossaryData = ref({
  vowels: characters.vowels,
  consonants: characters.consonants,
  vowel_signs: characters.vowelSigns
})

const showDialog = ref(false)
const selectedChar = ref('')

const formatTitle = (key) => key.replace('_', ' ').toUpperCase()

const transliterate = (char) => {
  return TransliterationService.transliterate(char, 'sharada', 'iast')
}

const showDetails = (char) => {
  selectedChar.value = char
  showDialog.value = true
}
</script>
