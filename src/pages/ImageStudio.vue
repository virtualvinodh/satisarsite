<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Sharada Image Studio</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Controls -->
        <div class="md:col-span-1 space-y-4">
          <q-card flat bordered class="bg-white">
            <q-card-section>
              <div class="text-h6 mb-2 text-primary">Content</div>
              <q-input
                v-model="textInput"
                type="textarea"
                label="Enter Text"
                filled
                class="sharada"
                @update:model-value="updateCanvasText"
              />

              <div class="mt-4 text-h6 mb-2 text-primary">Styling</div>
              <div class="space-y-2">
                <q-input filled v-model="textColor" label="Text Color">
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-menu>
                        <q-color v-model="textColor" @update:model-value="updateCanvasText" />
                      </q-menu>
                    </q-icon>
                  </template>
                </q-input>

                <q-slider
                  v-model="fontSize"
                  :min="10"
                  :max="200"
                  label
                  @update:model-value="updateCanvasText"
                />
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h6 mb-2 text-primary">Background</div>
              <q-btn-toggle
                v-model="bgType"
                toggle-color="primary"
                :options="[
                  {label: 'Color', value: 'color'},
                  {label: 'Image', value: 'image'}
                ]"
              />

              <div v-if="bgType === 'color'" class="mt-2">
                <q-input filled v-model="bgColor" label="BG Color">
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-menu>
                        <q-color v-model="bgColor" @update:model-value="updateCanvasBg" />
                      </q-menu>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div v-if="bgType === 'image'" class="mt-2">
                <q-file
                  v-model="bgImageFile"
                  label="Upload Background"
                  filled
                  @update:model-value="handleImageUpload"
                />
              </div>
            </q-card-section>

            <q-card-actions vertical align="center">
              <q-btn color="primary" icon="download" label="Download" @click="downloadImage" class="full-width" />
              <q-btn color="secondary" icon="share" label="Share" @click="shareImage" class="full-width q-mt-sm" />
            </q-card-actions>
          </q-card>
        </div>

        <!-- Canvas -->
        <div class="md:col-span-2 flex justify-center items-start">
          <div class="border shadow-lg bg-white overflow-hidden">
            <canvas id="studio-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as fabric from 'fabric'
import { Share } from '@capacitor/share'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const textInput = ref('𑆤𑆩𑆯𑇀𑆯𑆳𑆫𑆢𑆳𑆪𑆽')
const textColor = ref('#3e2723')
const fontSize = ref(60)
const bgType = ref('color')
const bgColor = ref('#f5e6d3')
const bgImageFile = ref(null)

let canvas = null
let textObject = null

onMounted(async () => {
  // Fabric 7 uses lowercase 'fabric' object often or named exports
  // Let's try to detect how it's imported
  const FabricCanvas = fabric.Canvas || fabric.fabric?.Canvas
  const FabricIText = fabric.IText || fabric.fabric?.IText

  if (!FabricCanvas) {
      console.error('Fabric Canvas not found in exports', fabric)
      return
  }

  canvas = new FabricCanvas('studio-canvas', {
    width: 500,
    height: 500,
    backgroundColor: bgColor.value
  })

  textObject = new FabricIText(textInput.value, {
    left: 250,
    top: 250,
    originX: 'center',
    originY: 'center',
    fontSize: fontSize.value,
    fill: textColor.value,
    fontFamily: 'Sharada'
  })

  canvas.add(textObject)
  canvas.renderAll()
})

const updateCanvasText = () => {
  if (!textObject) return
  textObject.set({
    text: textInput.value,
    fill: textColor.value,
    fontSize: fontSize.value
  })
  canvas.renderAll()
}

const updateCanvasBg = () => {
  if (!canvas) return
  canvas.backgroundImage = null
  canvas.backgroundColor = bgColor.value
  canvas.renderAll()
}

const handleImageUpload = (file) => {
  if (!file) return
  const reader = new FileReader()
  reader.onload = async (f) => {
    const data = f.target.result
    const FabricImage = fabric.Image || fabric.fabric?.Image
    const img = await FabricImage.fromURL(data)

    // Scale image to fit canvas
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
    canvas.backgroundImage = img
    img.set({
        scaleX: scale,
        scaleY: scale,
        originX: 'left',
        originY: 'top'
    })
    canvas.renderAll()
  }
  reader.readAsDataURL(file)
}

const downloadImage = () => {
  const dataURL = canvas.toDataURL({
    format: 'png',
    multiplier: 2 // High quality
  })
  const link = document.createElement('a')
  link.download = 'satisar-sharada.png'
  link.href = dataURL
  link.click()
}

const shareImage = async () => {
  const dataURL = canvas.toDataURL({
    format: 'png',
    multiplier: 1
  })

  try {
    await Share.share({
      title: 'Sharada Script',
      text: 'Shared from Satisar',
      url: dataURL,
      dialogTitle: 'Share with friends'
    })
  } catch (error) {
    console.error('Sharing failed', error)
    $q.notify({
      type: 'negative',
      message: 'Sharing is not supported on this browser. Try downloading instead.'
    })
  }
}
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
}
</style>
