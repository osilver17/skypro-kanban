import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import '@/assets/main.css'

const app = createApp(App)

// main.js
import { setupCalendar } from 'v-calendar';

// Use calendar defaults (optional)
app.use(setupCalendar, {})

app.use(router)

app.mount('#app')
