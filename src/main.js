import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './i18n'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import Tailwind and custom styles
import './style.css'

// Import the Root component
import App from './App.vue'

const myApp = createApp(App)

myApp.use(createPinia())
myApp.use(router)
myApp.use(i18n)

myApp.use(Quasar, {
  plugins: {
    Notify
  },
})

myApp.mount('#app')
