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
    color="rgba(255, 255, 255, 0.2)"
    class="pa-2"
    elevation="24"
    rounded="lg"
  >
    <v-row>
      <v-col cols="8" style="opacity: 0.75">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card-title
              v-bind="props"
              class="text-h2 my-4"
              :class="isHovering ? 'text-indigo-darken-4' : ''"
              style="cursor: pointer"
            >
              {{blog.title}}
            </v-card-title>
          </template>
        </v-hover>
        <v-card-subtitle class="d-flex text-body-1">
          <p></p>
        </v-card-subtitle>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <p
              v-bind="props"
              class="text-body-1 ml-4"
              :class="isHovering ? 'text-indigo-darken-4' : ''"
              style="cursor: pointer"
              @click="$router.push(`/category/${blog.parent_id}`)"
            >
              <v-icon>mdi-pound</v-icon>
              {{blog.parent.title}}
            </p>
          </template>
        </v-hover>
        <v-card-text class="d-flex justify-lg-space-between text-body-2">
          <p class="text-grey-darken-2">
            <v-icon class="mr-1">mdi-calendar-clock</v-icon>
            Created At &ensp;{{blog.created_time.slice(0, 10)}}
          </p>
          <v-divider vertical class="mx-2"/>
          <p class="text-grey-darken-2">
            <v-icon class="mr-1">mdi-calendar-clock</v-icon>
            Updated At &ensp;{{blog.updated_time.slice(0, 10)}}
          </p>
        </v-card-text>
        <v-divider class="ml-4 mb-2 mt-n1"/>
        <v-card-actions v-if="blog.tags.length > 0">
          <v-chip
            color="primary"
            class="mx-1"
            v-for="item in blog.tags"
            :key="item.id"
            @click="$router.push(`/tag/${item.id}`)"
          >
            {{item.name}}
          </v-chip>
        </v-card-actions>
        <slot name="action"/>
      </v-col>
      <v-col cols="4">
        <v-img src="https://api.isoyu.com/bing_images.php"/>
      </v-col>
    </v-row>
  </v-card>
</template>
