<script setup lang="ts">
import avatar from '../../assets/avatar.jpg'
import {useDisplay} from "vuetify";
import {computed} from "vue";
const emit = defineEmits(['confirm']);
function confirm() {
  emit('confirm')
}

const { name } = useDisplay()
const cardWidth = computed(() => {
  switch (name.value) {
    case 'xs': return 300
    case 'sm': return 600
  }
  return 800
})
</script>

<template>
  <v-card
    color="rgba(250, 251, 241, 1)"
    :width="cardWidth"
    class="mx-auto"
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
      <v-col class="d-none d-md-flex" md="4">
        <v-img
          cover
          :src="avatar"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
