import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../pages/IndexPage.vue')
  },
  {
    path: '/studio',
    component: () => import('../pages/ImageStudio.vue')
  },
  {
    path: '/learn',
    component: () => import('../pages/LearningPath.vue')
  },
  {
    path: '/lesson/:id',
    name: 'lesson',
    component: () => import('../pages/Lesson.vue')
  },
  {
    path: '/glossary',
    component: () => import('../pages/VisualGlossary.vue')
  },
  {
    path: '/reading',
    component: () => import('../pages/ReadingRoom.vue')
  },
  {
    path: '/worksheets',
    component: () => import('../pages/Worksheets.vue')
  },
  {
    path: '/books',
    component: () => import('../pages/Books.vue')
  },
  {
    path: '/game/match',
    component: () => import('../pages/MatchGame.vue')
  },
  {
    path: '/game/memory',
    component: () => import('../pages/MemoryGame.vue')
  },
  {
    path: '/game/flip',
    component: () => import('../pages/FlipGame.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
