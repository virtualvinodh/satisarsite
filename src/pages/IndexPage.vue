<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <q-btn-toggle
          v-model="mode"
          toggle-color="primary"
          flat
          class="bg-white border"
          :options="[
            {label: 'Typing', value: 'typing'},
            {label: 'Convert', value: 'convert'}
          ]"
        />

        <div v-if="mode === 'convert'" class="flex space-x-2">
          <q-btn-toggle
            v-model="inputScript"
            toggle-color="secondary"
            dense
            flat
            class="bg-white border"
            :options="[
              {label: 'Devanagari', value: 'devanagari'},
              {label: 'IAST', value: 'iast'}
            ]"
          />
        </div>

        <div v-if="mode === 'typing'" class="flex space-x-2">
           <q-btn-toggle
            v-model="layout"
            @update:model-value="changeLayout"
            toggle-color="secondary"
            dense
            flat
            class="bg-white border"
            :options="[
              {label: 'Phonetic', value: 'sharada_unicode_phonetic'},
              {label: 'Inscript', value: 'sharada_inscript'}
            ]"
          />
        </div>
      </div>

      <q-card flat bordered class="bg-white shadow-sm">
        <q-card-section>
          <q-input
            v-model="textInput"
            type="textarea"
            :rows="6"
            filled
            :class="mode === 'typing' ? 'sharada text-3xl' : 'text-xl'"
            placeholder="Start typing here..."
            @update:model-value="handleInputChange"
            id="main-input"
          />
        </q-card-section>

        <q-card-section v-if="mode === 'convert' && textInput" class="border-t bg-parchment-light">
          <div class="text-caption text-grey-6 mb-2">Sharada Result:</div>
          <div class="sharada text-4xl leading-relaxed break-words">
            {{ convertedText }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="bg-grey-1">
          <q-btn flat icon="content_copy" label="Copy" @click="copyText" />
          <q-btn flat icon="photo_camera" label="Studio" to="/studio" />
        </q-card-actions>
      </q-card>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <q-card flat bordered class="hover:bg-primary/5 transition-colors cursor-pointer" to="/learn">
          <q-card-section class="flex items-center">
            <q-icon name="school" size="md" color="primary" class="mr-4" />
            <div>
              <div class="text-h6">Learn Sharada</div>
              <div class="text-caption">Step-by-step lessons for beginners</div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="hover:bg-primary/5 transition-colors cursor-pointer" to="/reading">
          <q-card-section class="flex items-center">
            <q-icon name="menu_book" size="md" color="primary" class="mr-4" />
            <div>
              <div class="text-h6">Reading Room</div>
              <div class="text-caption">Practice reading historical texts</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { TransliterationService } from '../services/TransliterationService'
import { useQuasar, copyToClipboard } from 'quasar'

const $q = useQuasar()
const mode = ref('typing')
const inputScript = ref('devanagari')
const layout = ref('sharada_unicode_phonetic')
const textInput = ref('')

const convertedText = computed(() => {
  if (mode.value === 'convert') {
    return TransliterationService.transliterate(textInput.value, inputScript.value, 'sharada')
  }
  return textInput.value
})

onMounted(() => {
  attachKeyman()
})

watch(mode, () => {
  textInput.value = ''
  setTimeout(attachKeyman, 100)
})

function attachKeyman() {
  if (window.keyman) {
    const el = document.getElementById('main-input')
    if (el) {
      const textarea = el.querySelector('textarea')
      if (textarea) {
        window.keyman.attachToControl(textarea)
        if (mode.value === 'typing') {
          window.keyman.enableControl(textarea)
          window.keyman.setActiveKeyboard(layout.value)
        } else {
          window.keyman.disableControl(textarea)
        }
      }
    }
  }
}

function changeLayout() {
  if (window.keyman) {
    window.keyman.setActiveKeyboard(layout.value)
  }
}

function handleInputChange() {
  // Logic for input handling
}

async function copyText() {
  const text = mode.value === 'convert' ? convertedText.value : textInput.value
  await copyToClipboard(text)
  $q.notify({
    message: 'Copied to clipboard',
    color: 'positive',
    timeout: 1000
  })
}
</script>
