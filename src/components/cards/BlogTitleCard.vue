<script setup lang="ts">
import {PropType} from "vue";
import type {ContentOutput} from "@/types/schemas/resource";
import {useRouter} from "vue-router";

const props = defineProps({
  blog: {
    type: Object as PropType<ContentOutput>,
    required: true
  }
})

const router = useRouter()
const push = (path: string) => {
  router.push(path)
}
</script>

<template>
  <v-sheet
    class="py-8 blog-title text-white"
    v-show="blog !== undefined"
    style="position: relative"
  >
    <div class="bgd"/>
    <v-sheet
      max-width="800"
      class="mx-auto bg-transparent text-center"
      style="background: transparent">
      <p class="text-h4 text-sm-h3 text-md-h2">
        {{props.blog.title}}
      </p>

      <v-divider
        color="black"
        class="my-6"
      />

      <div class="d-flex justify-space-between text-body-2 text-sm-body-1 mb-6">
        <v-hover>
          <template v-slot="{ isHovering, props }">
            <p
              v-bind="props"
              :class="isHovering ? 'text-indigo-darken-4' : ''"
              style="cursor: pointer"
              @click="push(`/category/${encodeURIComponent(blog.category?.name)}`)"
            >
              <v-icon color="yellow">mdi-pound</v-icon>
              {{blog.category?.name}}
            </p>
          </template>
        </v-hover>
        <v-divider vertical color="grey-lighten-1"/>
        <p>
          <v-icon color="yellow" class="mr-1">mdi-calendar-clock</v-icon>
          Created At {{blog.created_time.slice(0,10)}}
        </p>
        <v-divider vertical color="grey-lighten-1"/>
        <p>
          <v-icon color="yellow" class="mr-1">mdi-calendar-clock</v-icon>
          Updated At {{blog.updated_time.slice(0,10)}}
        </p>
      </div>
      <v-chip
        color="yellow"
        class="mx-1"
        v-for="item in blog.tags"
        :key="item.id"
        @click="push(`/tag/${encodeURIComponent(item.name)}`)"
      >
        {{item.name}}
      </v-chip>
    </v-sheet>
  </v-sheet>
</template>

<style scoped>
.bgd {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -100;
  background: repeat-y fixed url('../../assets/banner.jpg');
  filter: brightness(70%);
  background-size: 100% auto;
  -webkit-background-size: 100% auto;
}
.blog-title {
  filter: brightness(100%);
}
</style>
