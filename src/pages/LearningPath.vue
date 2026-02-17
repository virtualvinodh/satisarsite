<template>
  <q-page padding class="bg-parchment-light">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-2">The Sharada Journey</h1>
      <p class="text-grey-8 mb-8">Master the ancient script of Kashmir step-by-step.</p>

      <div class="space-y-6">
        <div v-for="(lesson, index) in lessons" :key="lesson.id" class="relative">
          <!-- Connection Line -->
          <div v-if="index < lessons.length - 1" class="absolute left-8 top-16 w-1 h-12 bg-grey-3 -z-10"></div>

          <q-card flat bordered :class="['cursor-pointer hover:shadow-md transition-all', isCompleted(lesson.id) ? 'bg-green-50' : 'bg-white']" @click="startLesson(lesson)">
            <q-card-section side class="flex items-center">
              <div :class="['w-16 h-16 rounded-full flex items-center justify-center text-white mr-4', isCompleted(lesson.id) ? 'bg-green' : 'bg-primary']">
                <q-icon :name="isCompleted(lesson.id) ? 'check' : 'school'" size="md" />
              </div>
              <div>
                <div class="text-h6 text-primary">{{ lesson.title }}</div>
                <div class="text-caption text-grey-7">{{ lesson.description }}</div>
              </div>
              <q-space />
              <q-icon name="chevron_right" size="sm" color="grey-5" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import lessonsData from '../data/lessons/path.json'

const router = useRouter()
const lessons = ref(lessonsData)
const completedLessons = ref([])

onMounted(() => {
  const saved = localStorage.getItem('satisar_progress')
  if (saved) {
    completedLessons.value = JSON.parse(saved)
  }
})

const isCompleted = (id) => completedLessons.value.includes(id)

const startLesson = (lesson) => {
  router.push({ name: 'lesson', params: { id: lesson.id } })
}
</script>
