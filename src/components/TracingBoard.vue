<template>
  <div class="tracing-container relative border rounded-lg overflow-hidden bg-white" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- Background Character (Ghost) -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
      <span class="sharada" :style="{ fontSize: (size * 0.8) + 'px' }">{{ char }}</span>
    </div>

    <!-- Drawing Canvas -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 cursor-crosshair"
      :width="size"
      :height="size"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.prevent="startDrawing"
      @touchmove.prevent="draw"
      @touchend.prevent="stopDrawing"
    ></canvas>

    <div class="absolute bottom-2 right-2 flex space-x-2">
      <q-btn round size="sm" color="grey-4" icon="delete" @click="clearCanvas" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  char: String,
  size: {
    type: Number,
    default: 300
  }
})

const canvasRef = ref(null)
let ctx = null
let isDrawing = false

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  ctx.strokeStyle = '#3e2723'
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
})

const getPos = (e) => {
  const rect = canvasRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  }
}

const startDrawing = (e) => {
  isDrawing = true
  const pos = getPos(e)
  ctx.beginPath()
  ctx.moveTo(pos.x, pos.y)
}

const draw = (e) => {
  if (!isDrawing) return
  const pos = getPos(e)
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
}

const stopDrawing = () => {
  isDrawing = false
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, props.size, props.size)
}
</script>
