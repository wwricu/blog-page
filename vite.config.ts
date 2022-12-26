import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'
// import importToCDN from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		vuetify({ autoImport: true }),
        visualizer({
          emitFile: true,
          filename: 'stats.html',
          open: true
        }),
        // importToCDN({
        //   modules: [
        //       {
        //           name:"vuetify",
        //           var:"Vuetify",
        //           path:"https://cdn.jsdelivr.net/npm/vuetify@3.0.3/dist/vuetify.min.js",
        //           css:"https://cdn.jsdelivr.net/npm/vuetify@3.0.3/dist/vuetify.min.css"
        //       },
        //   ]
        // })
	],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'https://unpkg.com/vue@3/dist/vue.esm-browser.js',
    }
  }
})
