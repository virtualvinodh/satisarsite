<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-3xl font-bold text-primary mb-2">Memory Match</h1>
      <p class="text-grey-8 mb-8">Match the Sharada character with its Roman transliteration.</p>

      <div v-if="!gameStarted" class="q-pa-xl">
        <q-btn color="primary" label="Start Game" size="lg" @click="startGame" />
      </div>

      <div v-else>
        <div class="flex justify-between items-center mb-4">
          <div class="text-h6">Moves: {{ moves }}</div>
          <q-btn flat color="primary" label="Reset" icon="refresh" @click="startGame" />
        </div>

        <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">
          <div v-for="(card, index) in cards" :key="index"
            class="aspect-square cursor-pointer transition-all duration-500 relative"
            style="perspective: 1000px"
            @click="flipCard(index)"
          >
            <div class="w-full h-full absolute transition-transform duration-500"
              :style="{ transformStyle: 'preserve-3d', transform: card.flipped || card.matched ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
              <!-- Front -->
              <div class="absolute w-full h-full bg-primary rounded shadow-md flex items-center justify-center text-white" style="backface-visibility: hidden;">
                <q-icon name="help_outline" size="md" />
              </div>
              <!-- Back -->
              <div class="absolute w-full h-full bg-white rounded shadow-md border-2 border-primary flex items-center justify-center text-primary"
                style="backface-visibility: hidden; transform: rotateY(180deg);">
                <div :class="[card.type === 'sharada' ? 'sharada text-4xl' : 'text-xl font-bold']">
                  {{ card.value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Win Dialog -->
    <q-dialog v-model="showWinDialog">
      <q-card class="bg-parchment p-4 text-center">
        <q-card-section>
          <q-icon name="celebration" size="xl" color="warning" />
          <div class="text-h5 text-primary mt-4">Excellent!</div>
          <p class="mt-2">You matched all characters in {{ moves }} moves.</p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="Play Again" color="primary" @click="startGame" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import characters from '../data/content/characters.json'
import { TransliterationService } from '../services/TransliterationService'

const gameStarted = ref(false)
const cards = ref([])
const moves = ref(0)
const flippedCards = ref([])
const showWinDialog = ref(false)

const startGame = () => {
  moves.value = 0
  flippedCards.value = []
  showWinDialog.value = false

  // Pick 8 random characters
  const allChars = [...characters.vowels, ...characters.consonants]
  const picked = []
  while (picked.length < 8) {
    const char = allChars[Math.floor(Math.random() * allChars.length)]
    if (!picked.includes(char)) picked.push(char)
  }

  // Create card pairs
  const cardPairs = []
  picked.forEach(char => {
    cardPairs.push({ type: 'sharada', value: char, flipped: false, matched: false, pairId: char })
    cardPairs.push({ type: 'iast', value: TransliterationService.transliterate(char, 'sharada', 'iast'), flipped: false, matched: false, pairId: char })
  })

  // Shuffle
  cards.value = cardPairs.sort(() => Math.random() - 0.5)
  gameStarted.value = true
}

const flipCard = (index) => {
  const card = cards.value[index]
  if (card.flipped || card.matched || flippedCards.value.length === 2) return

  card.flipped = true
  flippedCards.value.push(index)

  if (flippedCards.value.length === 2) {
    moves.value++
    const [idx1, idx2] = flippedCards.value
    if (cards.value[idx1].pairId === cards.value[idx2].pairId) {
      cards.value[idx1].matched = true
      cards.value[idx2].matched = true
      flippedCards.value = []

      if (cards.value.every(c => c.matched)) {
        setTimeout(() => { showWinDialog.value = true }, 500)
      }
    } else {
      setTimeout(() => {
        cards.value[idx1].flipped = false
        cards.value[idx2].flipped = false
        flippedCards.value = []
      }, 1000)
    }
  }
}
</script>
