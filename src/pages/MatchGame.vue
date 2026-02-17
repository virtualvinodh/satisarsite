<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Match the Letter</h1>

      <div class="grid grid-cols-2 gap-8">
        <!-- Sharada Column -->
        <div class="space-y-4">
          <div
            v-for="(item, idx) in leftColumn"
            :key="'left-'+idx"
            :class="[
              'p-6 text-center border-2 rounded-lg cursor-pointer transition-all sharada text-5xl',
              selectedLeft === idx ? 'border-primary bg-primary/10' : 'border-grey-3 bg-white',
              item.matched ? 'opacity-0 pointer-events-none' : 'hover:border-primary/50'
            ]"
            @click="selectLeft(idx)"
          >
            {{ item.char }}
          </div>
        </div>

        <!-- Devanagari/IAST Column -->
        <div class="space-y-4">
          <div
            v-for="(item, idx) in rightColumn"
            :key="'right-'+idx"
            :class="[
              'p-6 text-center border-2 rounded-lg cursor-pointer transition-all text-3xl font-bold',
              selectedRight === idx ? 'border-secondary bg-secondary/10' : 'border-grey-3 bg-white',
              item.matched ? 'opacity-0 pointer-events-none' : 'hover:border-secondary/50'
            ]"
            @click="selectRight(idx)"
          >
            {{ item.char }}
          </div>
        </div>
      </div>

      <div v-if="gameFinished" class="mt-12 text-center">
        <h2 class="text-2xl font-bold text-green mb-4">Well Done!</h2>
        <q-btn color="primary" label="Play Again" @click="initGame" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import characters from '../data/content/characters.json'
import { TransliterationService } from '../services/TransliterationService'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const leftColumn = ref([])
const rightColumn = ref([])
const selectedLeft = ref(null)
const selectedRight = ref(null)
const gameFinished = ref(false)

const initGame = () => {
  const pool = characters.vowels.concat(characters.consonants)
  const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5)

  leftColumn.value = shuffled.map(c => ({
    char: TransliterationService.transliterate(c, 'devanagari', 'sharada'),
    id: c,
    matched: false
  })).sort(() => 0.5 - Math.random())

  rightColumn.value = shuffled.map(c => ({
    char: c,
    id: c,
    matched: false
  })).sort(() => 0.5 - Math.random())

  selectedLeft.value = null
  selectedRight.value = null
  gameFinished.value = false
}

const selectLeft = (idx) => {
  selectedLeft.value = idx
  checkMatch()
}

const selectRight = (idx) => {
  selectedRight.value = idx
  checkMatch()
}

const checkMatch = () => {
  if (selectedLeft.value !== null && selectedRight.value !== null) {
    const left = leftColumn.value[selectedLeft.value]
    const right = rightColumn.value[selectedRight.value]

    if (left.id === right.id) {
      $q.notify({ type: 'positive', message: 'Match!', timeout: 500 })
      left.matched = true
      right.matched = true
      selectedLeft.value = null
      selectedRight.value = null

      if (leftColumn.value.every(i => i.matched)) {
        gameFinished.value = true
      }
    } else {
      $q.notify({ type: 'negative', message: 'Try again', timeout: 500 })
      selectedLeft.value = null
      selectedRight.value = null
    }
  }
}

onMounted(initGame)
</script>
