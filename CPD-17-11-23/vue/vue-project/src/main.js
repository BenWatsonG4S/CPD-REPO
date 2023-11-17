import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp({
    setup() {
      return {
        count: ref(0)
      }
    }
  }).mount('#app')
