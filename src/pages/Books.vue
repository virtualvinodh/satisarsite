<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-primary">Library</h1>
        <q-select
          v-model="selectedBookKey"
          :options="bookOptions"
          label="Choose a text"
          filled
          class="w-64"
          emit-value
          map-options
        />
      </div>

      <q-card flat bordered class="bg-white p-8 min-h-[60vh]">
        <div class="flex justify-end space-x-2 mb-4">
          <q-btn-toggle
            v-model="guideScript"
            toggle-color="primary"
            flat
            dense
            class="border"
            :options="[
              {label: 'No Guide', value: 'none'},
              {label: 'Devanagari', value: 'devanagari'},
              {label: 'IAST', value: 'iast'}
            ]"
          />
        </div>

        <div v-if="currentBookContent" class="space-y-6">
          <div v-for="(line, lIdx) in currentBookLines" :key="lIdx" class="leading-loose flex flex-wrap">
            <template v-for="(word, wIdx) in line.split(' ')" :key="wIdx">
              <div class="mr-4 mb-4 flex flex-col items-center">
                <span class="sharada text-4xl text-brown-9">{{ transliterate(word, 'devanagari', 'sharada') }}</span>
                <span v-if="guideScript !== 'none'" class="text-xs text-grey-6 border-t border-grey-3 w-full text-center pt-1 mt-1">
                   {{ guideScript === 'iast' ? transliterate(word, 'devanagari', 'iast') : word }}
                </span>
              </div>
            </template>
          </div>
        </div>

        <div v-else class="flex flex-center h-full text-grey-5 italic">
          Select a book to start reading...
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import booksData from '../data/content/books.json'
import { TransliterationService } from '../services/TransliterationService'

const selectedBookKey = ref('sharada')
const guideScript = ref('none')

const bookOptions = Object.keys(booksData).map(key => ({
  label: key.charAt(0).toUpperCase() + key.slice(1),
  value: key
}))

const currentBookContent = computed(() => booksData[selectedBookKey.value])
const currentBookLines = computed(() => currentBookContent.value ? currentBookContent.value.split('\n') : [])

const transliterate = (text, from, to) => {
  return TransliterationService.transliterate(text, from, to)
}
</script>
