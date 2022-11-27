<script setup lang="ts">
import avatar from '../../assets/avatar.jpg'
const emit = defineEmits(['confirm']);
function confirm() {
  emit('confirm')
}
</script>

<template>
  <v-card
    color="rgba(250, 251, 241, 1)"
    width="800"
    class="mx-auto"
  >
    <v-row no-gutters>
      <v-col rols="8">
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
            UI components:
            <a
              href="https://next.vuetifyjs.com/" target="_blank">Vuetify.js</a>
          </p>
          <p>
            Service framework:
            <a href="https://fastapi.tiangolo.com/" target="_blank">FastAPI</a>
          </p>
          <p>
            ORM:
            <a href="https://www.sqlalchemy.org/" target="_blank">SQLAlchemy</a>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            color="primary"
            @click="confirm()"
          >
            YES!
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col class="d-flex" cols="4">
        <v-img
          cover
          :src="avatar"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
