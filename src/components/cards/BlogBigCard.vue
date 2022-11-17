<script setup lang="ts">

const props = defineProps({
  blog: {
    required: true
  }
})
</script>

<template>
  <v-card
    min-height="180"
    width="900"
    color="blue-grey-lighten-5"
    class="bgdColor"
    elevation="24"
    rounded="lg"
  >
    <v-card-title>{{blog.title}}</v-card-title>
    <v-card-text class="d-flex">
      <p class="text-grey-darken-2">Created Time: &ensp;</p>
      <p>{{blog.created_time}}</p>
    </v-card-text>
    <v-slot name="action"/>
  </v-card>
</template>

<style scoped>
.bgdColor {
  opacity: 0.6;
  background-image: linear-gradient(to right bottom,
                                    #fbe7ef 0%,
                                    #dff4fd 100%);
}
</style>
