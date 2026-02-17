<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-3xl font-bold text-primary mb-2">Flip Cards</h1>
      <p class="text-grey-8 mb-8">Guess the character and click to reveal.</p>

      <div class="row q-col-gutter-md justify-center mb-8">
        <div class="col-12 col-sm-auto">
          <q-select v-model="guideScript" :options="scriptOptions" label="Guide Script" dense outlined class="bg-white min-w-[150px]" />
        </div>
        <div class="col-12 col-sm-auto">
          <q-btn color="primary" icon="refresh" label="New Set" @click="generateCards" />
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        <div v-for="(card, index) in cards" :key="index"
          class="aspect-square cursor-pointer relative"
          style="perspective: 1000px"
          @click="card.flipped = !card.flipped"
        >
          <div class="w-full h-full absolute transition-transform duration-500"
            :style="{ transformStyle: 'preserve-3d', transform: card.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
            <!-- Front (Sharada) -->
            <div class="absolute w-full h-full bg-white rounded shadow-md border-2 border-sepia-200 flex items-center justify-center text-sepia-900" style="backface-visibility: hidden;">
              <div class="sharada text-6xl">{{ card.sharada }}</div>
            </div>
            <!-- Back (IAST/Devanagari) -->
            <div class="absolute w-full h-full bg-primary rounded shadow-md flex flex-col items-center justify-center text-white"
              style="backface-visibility: hidden; transform: rotateY(180deg);">
              <div class="text-2xl font-bold">{{ transliterate(card.sharada, guideScript.value) }}</div>
              <div class="text-xs uppercase mt-1 opacity-70">{{ guideScript.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import characters from '../data/content/characters.json'
import { TransliterationService } from '../services/TransliterationService'

const guideScript = ref({ label: 'Roman (IAST)', value: 'iast' })
const scriptOptions = [
  { label: 'Roman (IAST)', value: 'iast' },
  { label: 'Devanagari', value: 'devanagari' }
]

const cards = ref([])

const generateCards = () => {
  const allChars = [...characters.vowels, ...characters.consonants]
  const picked = []
  while (picked.length < 15) {
    const char = allChars[Math.floor(Math.random() * allChars.length)]
    if (!picked.includes(char)) picked.push(char)
  }

  cards.value = picked.map(char => ({
    sharada: char,
    flipped: false
  }))
}

const transliterate = (char, to) => {
  return TransliterationService.transliterate(char, 'sharada', to)
}

onMounted(generateCards)
</script>
