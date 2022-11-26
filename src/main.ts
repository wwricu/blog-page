import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { createPinia } from 'pinia'
import axios from "axios";

loadFonts().then()

const app = createApp(App)
axios.defaults.method = 'POST'
axios.defaults.baseURL = 'http://localhost:8443'
axios.defaults.withCredentials = true
app.config.globalProperties.$http = axios

app.component('QuillEditor', QuillEditor)
   .use(router)
   .use(vuetify)
   .use(createPinia())
   .mount('#app')


