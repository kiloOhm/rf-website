import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueShowdownPlugin } from 'vue-showdown';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(VueShowdownPlugin, {
  options: {
    emoji: true,
  },
})
app.use(createPinia())
app.use(router)

app.mount('#app')
