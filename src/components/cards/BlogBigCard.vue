<script setup lang="ts">

const props = defineProps({
  blog: {
    required: true
  }
})
</script>

<template>
  <v-card
    min-height="200"
    width="800"
    color="blue-grey-lighten-5"
    class="bgdColor pa-2"
    elevation="24"
    rounded="lg"
  >
    <v-row>
      <v-col cols="8">
        <v-card-title class="text-h4 my-2">
          {{props.blog.title}}
        </v-card-title>
        <v-card-subtitle class="d-flex text-body-1">
          <p></p>
        </v-card-subtitle>
        <v-card-text class="d-flex text-body-2">
          <p>{{blog.parent.title}}</p>
          <v-divider vertical class="mx-2"/>
          <v-icon class="mr-1">mdi-calendar-clock</v-icon>
          <p class="text-grey-darken-2">Created At: &ensp;</p>
          <p>{{blog.created_time.slice(0, 10)}}</p>
          <v-divider vertical class="mx-2"/>
          <v-icon class="mr-1">mdi-calendar-clock</v-icon>
          <p class="text-grey-darken-2">Updated At: &ensp;</p>
          <p>{{blog.updated_time.slice(0, 10)}}</p>
        </v-card-text>
        <v-divider class="ml-4 mb-2"/>
        <v-card-actions v-if="blog.tags.length > 0">
          <v-chip
            color="primary"
            v-for="item in blog.tags"
            :key="item.id"
          >
            {{item.name}}
          </v-chip>
        </v-card-actions>
        <slot name="action"/>
      </v-col>
      <v-col cols="4">
        <v-img></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.bgdColor {
  opacity: 0.6;
  background-color: rgba(255, 255, 255, 0);
}
</style>
