<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Reading Room</h1>

      <div v-for="(verse, index) in verses" :key="index" class="mb-12 bg-white p-8 rounded-lg shadow-sm border border-parchment-dark relative group">
        <div class="absolute top-4 right-4 text-xs text-parchment-dark font-serif italic">Verse {{ index + 1 }}</div>

        <div class="sharada text-5xl leading-relaxed text-center mb-8 text-brown-9">
          <span v-for="(word, wIndex) in verse.sharada.split(' ')" :key="wIndex" class="inline-block mx-2 hover:text-primary transition-colors cursor-help">
            {{ word }}
            <q-tooltip class="bg-primary text-white text-sm">
              {{ verse.iast.split(' ')[wIndex] }}
            </q-tooltip>
          </span>
        </div>

        <div class="border-t pt-4">
          <p class="text-grey-8 italic text-center">{{ verse.translation }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import versesData from '../data/content/verses.json'
import { TransliterationService } from '../services/TransliterationService'

const verses = ref([])

onMounted(() => {
  verses.value = versesData.map(v => ({
    ...v,
    sharada: TransliterationService.transliterate(v.iast, 'iast', 'sharada')
  }))
})
</script>
