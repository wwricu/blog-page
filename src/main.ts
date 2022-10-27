import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

loadFonts().then(r => console.log(r))

createApp(App)
  .component('QuillEditor', QuillEditor)
  .use(router)
  .use(vuetify)
  .mount('#app')
