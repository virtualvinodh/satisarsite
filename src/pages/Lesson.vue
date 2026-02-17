<template>
  <q-page padding class="bg-parchment-light">
    <div v-if="lesson" class="max-w-4xl mx-auto">
      <q-btn flat icon="arrow_back" label="Back to Journey" to="/learn" class="mb-4" />

      <h1 class="text-3xl font-bold text-primary mb-2">{{ lesson.title }}</h1>
      <p class="text-grey-8 mb-8">{{ lesson.description }}</p>

      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        <q-card v-for="char in chars" :key="char" class="cursor-pointer hover:shadow-md transition-all text-center p-4" @click="selectedChar = char">
          <div class="sharada text-5xl mb-2">{{ char }}</div>
          <div class="text-caption text-grey-6">{{ transliterate(char) }}</div>
        </q-card>
      </div>

      <q-dialog v-model="hasSelectedChar" @hide="selectedChar = ''">
        <q-card class="bg-parchment p-4 min-w-[300px]">
          <q-card-section class="flex flex-col items-center">
            <div class="sharada text-8xl mb-4">{{ selectedChar }}</div>
            <div class="text-2xl font-bold text-primary">{{ transliterate(selectedChar) }}</div>
            <p class="text-grey-7 mt-2">Practice tracing this character below:</p>
            <TracingBoard :char="selectedChar" :size="250" class="mt-4" v-if="selectedChar" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Mark Lesson as Complete" color="positive" @click="completeLesson" v-if="!isCompleted" />
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import lessonsData from '../data/lessons/path.json'
import characters from '../data/content/characters.json'
import { TransliterationService } from '../services/TransliterationService'
import TracingBoard from '../components/TracingBoard.vue'

const route = useRoute()
const router = useRouter()
const selectedChar = ref('')

const hasSelectedChar = computed({
  get: () => !!selectedChar.value,
  set: (val) => { if (!val) selectedChar.value = '' }
})

const lesson = computed(() => lessonsData.find(l => l.id === route.params.id))
const chars = computed(() => lesson.value ? characters[lesson.value.data_key] : [])

const transliterate = (char) => TransliterationService.transliterate(char, 'sharada', 'iast')

const isCompleted = ref(false)

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('satisar_progress') || '[]')
  isCompleted.value = saved.includes(route.params.id)
})

const completeLesson = () => {
  const saved = JSON.parse(localStorage.getItem('satisar_progress') || '[]')
  if (!saved.includes(route.params.id)) {
    saved.push(route.params.id)
    localStorage.setItem('satisar_progress', JSON.stringify(saved))
  }
  isCompleted.value = true
  selectedChar.value = ''
}
</script>
