<script setup lang="ts">
import {PropType} from "vue";
import type {ContentOutput} from "@/types/schemas/resource";

const props = defineProps({
  blog: {
    type: Object as PropType<ContentOutput>,
    required: true
  }
})
</script>

<template>
  <v-sheet
    height="260"
    class="bg-transparent pt-8"
    v-show="blog !== undefined"
  >
    <v-sheet
      max-width="800"
      class="mx-auto text-center"
      style="background: transparent">
      <p class="text-h1">
        {{blog.title}}
      </p>

      <v-divider
        color="black"
        class="my-6"
      />

      <div class="d-flex justify-lg-space-between text-body-1 mb-6">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <p
              v-bind="props"
              :class="isHovering ? 'text-indigo-darken-4' : ''"
              style="cursor: pointer"
              @click="$router.push(`/category/${blog.parent_id}`)"
            >
              <v-icon>mdi-pound</v-icon>
              {{blog.parent.title}}
            </p>
          </template>
        </v-hover>
        <v-divider vertical color="grey-lighten-1"/>
        <p>
          <v-icon class="mr-1">mdi-calendar-clock</v-icon>
          Created At {{blog.created_time.slice(0,10)}}
        </p>
        <v-divider vertical color="grey-lighten-1"/>
        <p>
          <v-icon class="mr-1">mdi-calendar-clock</v-icon>
          Updated At {{blog.updated_time.slice(0,10)}}
        </p>
      </div>
      <v-chip
        color="primary"
        class="mx-1"
        v-for="item in blog.tags"
        :key="item.id"
        @click="$router.push(`/tag/${item.id}`)"
      >
        {{item.name}}
      </v-chip>
    </v-sheet>

  </v-sheet>
</template>
