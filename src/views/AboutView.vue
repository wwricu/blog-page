<script setup lang="ts">
import {useRouter} from "vue-router";

import avatar from '@/assets/avatar.jpg'
import bgdImg from "@/assets/blog_background.png"
import CustomFooter from "@/components/cards/CustomFooter.vue";
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import WalineCard from "@/components/cards/WalineCard.vue";


const router = useRouter()
</script>

<template>
  <v-app-bar
    style="position:fixed;"
    density="compact"
    class="bg-blue-grey-lighten-5"
  >
    <navigate-button
      title="Home"
      prepend-icon="mdi-home"
      @click="router.push('/')"
    />
  </v-app-bar>
  <v-parallax :src="bgdImg" style="background: #fafbf1;">
    <v-card
      class="mx-auto mt-2"
      color="rgba(250, 250, 250, 0.7)"
      max-width="800"
      elevation="16"
    >
      <v-row no-gutters>
        <v-col sm="12" md="8">
          <v-card-title>About</v-card-title>
          <v-card-text class="text-body-1 text-grey-darken-2">
            <p>
              浅浅地试运行;<br/>
              说是博客其实主要用来做笔记和一些小工具(希望好用)
            </p>
          </v-card-text>
          <v-card-text class="text-body-1 text-grey-darken-2">
            <p>
              JS framework:
              <a href="https://vuejs.org/" target="_blank">Vue.js</a>
            </p>
            <p>
              Markdown solution:
              <a href="https://github.com/Vanessa219/vditor" target="_blank">Vditor</a>
            </p>
            <p>
              Comment solution:
              <a href="https://waline.js.org/" target="_blank">Waline</a>
            </p>
            <p>
              UI components:
              <a href="https://next.vuetifyjs.com/" target="_blank">Vuetify.js</a>
            </p>
            <p>
              Service framework:
              <a href="https://fastapi.tiangolo.com/" target="_blank">FastAPI</a>
            </p>
            <p>
              ORM framework:
              <a href="https://www.sqlalchemy.org/" target="_blank">SQLAlchemy</a>
            </p>
          </v-card-text>
        </v-col>
        <v-col class="d-none d-md-flex" md="4">
          <v-img cover :src="avatar"/>
        </v-col>
      </v-row>
      <v-divider class="mb-4"/>
      <waline-card class="mx-2"/>
    </v-card>
    <custom-footer
      style="position:absolute; bottom:0; left:50%; transform:translateX(-50%);"
      :text-color="'text-grey-darken-3'"
    />
  </v-parallax>
</template>
