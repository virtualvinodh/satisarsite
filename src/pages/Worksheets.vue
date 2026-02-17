<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Printable Practice Sheets</h1>

      <q-card flat bordered class="mb-8">
        <q-card-section>
          <div class="text-h6 mb-4">Generate custom tracing sheets</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <q-select
              v-model="selectedCategory"
              :options="categories"
              label="Select Category"
              filled
            />
            <q-input
              v-model.number="rows"
              type="number"
              label="Number of rows"
              filled
              min="1"
              max="20"
            />
          </div>

          <div class="mt-6 flex justify-center">
            <q-btn
              color="primary"
              icon="picture_as_pdf"
              label="Generate PDF"
              size="lg"
              @click="generatePDF"
            />
          </div>
        </q-card-section>
      </q-card>

      <div class="text-center text-grey-7">
        <p>This will generate a PDF with "ghost" characters that you can print and trace with a pen or pencil.</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import characters from '../data/content/characters.json'
import { jsPDF } from 'jspdf'

const selectedCategory = ref('vowels')
const rows = ref(10)

const categories = [
  { label: 'Vowels', value: 'vowels' },
  { label: 'Consonants', value: 'consonants' },
  { label: 'Kashmiri Vowels', value: 'vowelska' },
  { label: 'Kashmiri Consonants', value: 'consonantska' }
]

const generatePDF = async () => {
  try {
    const doc = new jsPDF()
    const charList = characters[selectedCategory.value.value || selectedCategory.value] || []

    // Load and register Sharada font
    const fontUrl = '/fonts/Sharada.ttf'
    const response = await fetch(fontUrl)
    const arrayBuffer = await response.arrayBuffer()
    const base64Font = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    )

    doc.addFileToVFS('Sharada.ttf', base64Font)
    doc.addFont('Sharada.ttf', 'Sharada', 'normal')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text(`Sharada Practice Sheet: ${selectedCategory.value.label || selectedCategory.value}`, 20, 20)

    doc.setFont('Sharada')
    doc.setFontSize(36)
    doc.setTextColor(200, 200, 200) // Light grey for tracing

    let y = 40
    const rowCount = rows.value

    charList.slice(0, 10).forEach((char, charIdx) => {
      if (y > 270) {
        doc.addPage()
        y = 20
        doc.setFont('Sharada')
      }

      // Draw multiple rows of the same character for practice
      for (let r = 0; r < rowCount; r++) {
        let x = 20
        for (let c = 0; c < 8; c++) {
          doc.text(char, x, y)
          x += 22
        }
        y += 15
        if (y > 280) {
          doc.addPage()
          y = 20
          doc.setFont('Sharada')
        }
      }
      y += 10 // Space between different characters
    })

    doc.save(`sharada-${selectedCategory.value.value || selectedCategory.value}-practice.pdf`)
  } catch (error) {
    console.error('PDF Generation failed:', error)
  }
}
</script>
