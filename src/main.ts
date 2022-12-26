import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import { createPinia } from 'pinia'

loadFonts().then()

const app = createApp(App)

app.use(router)
   .use(vuetify)
   .use(createPinia())
   .mount('#app')


