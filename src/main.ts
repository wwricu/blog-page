import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'


loadFonts().then()

const pinia = createPinia()
const installPersistedStatePlugin = createPersistedStatePlugin()
pinia.use((context) => {
    installPersistedStatePlugin(context)
})

const app = createApp(App)
app.use(router)
   .use(vuetify)
   .use(pinia)
   .mount('#app')
