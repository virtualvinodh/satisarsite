import { createI18n } from 'vue-i18n'
import en from './en-US'
import hi from './hi'
import ks from './ks'

const messages = {
  'en': en,
  'hi': hi,
  'ks': ks
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})
