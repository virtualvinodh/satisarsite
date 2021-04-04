
export default [
  {
    path: '/',
    redirect: '/editor'
  },

  {
    path: '/learn-sharada',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/learn-sharada') }
    ]
  },

  {
    path: '/memory-cards',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/memory-cards') }
    ]
  },

  {
    path: '/flipcards-shuffle',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/flipcards-shuffle') }
    ]
  },

  {
    path: '/fill-sharada',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/fill-sharada') }
    ]
  },

  {
    path: '/match-letter',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/match-letter') }
    ]
  },

  {
    path: '/reading-practice',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/books') }
    ]
  },

  {
    path: '/tholkaappiyam',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/tholkaappiyam') }
    ]
  },

  {
    path: '/about',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/about') }
    ]
  },

  {
    path: '/editor',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },

  {
    path: '/image',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/image') }
    ]
  },

  {
    path: '/download',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/download') }
    ]
  },

  {
    path: '/adinatha-manual',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/adinatha-manual') }
    ]
  },

  {
    path: '/e-brahmi-manual',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/e-brahmi-manual') }
    ]
  },

  {
    path: '/e-velvi-manual',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/e-velvi-manual') }
    ]
  },

  {
    path: '/adinatha-manual',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/adinatha-manual') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
