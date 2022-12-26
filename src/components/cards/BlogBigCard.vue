<script setup lang="ts">
import type {PropType} from "vue";
import type {ContentOutput} from'@/types/schemas/resource'
import {computed, onMounted, ref} from "vue";
import { useDisplay } from 'vuetify'

const props = defineProps({
  coverIndex: {
    type: [Number, String],
    required: false,
    default: 1
  },
  blog: {
    type: Object as PropType<ContentOutput>,
    required: true
  }
})

const { name } = useDisplay()
const cardWidth = computed(() => {
  switch (name.value) {
    case 'xs':
    case 'sm': return 'w-auto'
  }
  return 800
})

const getImgUrl = () => {
  return new URL(`../../assets/card_covers/${props.coverIndex}.jpg`,
      import.meta.url).href;
}
</script>
<!--color="rgba(236, 239, 241, 0.8)"-->

<template>
  <v-card
    min-height="200"
    color="rgba(250, 251, 241, 0.8)"
    :width="cardWidth"
    rounded="lg"
  >
    <v-row>
      <v-col xs="12" sm="8" style="opacity: 0.75">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card-title
              v-bind="props"
              class="text-h4 my-4"
              :class="isHovering ? 'text-indigo-darken-4' : ''"
              style="cursor: pointer;"
              @click="$router.push(`/content/${blog.id}`)"
            >
              {{blog.title}}
            </v-card-title>
          </template>
        </v-hover>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <p
              v-bind="props"
              class="text-body-1 ml-4"
              :class="isHovering ? 'text-indigo-darken-4' : ''"
              style="cursor: pointer"
              @click="$router.push(`/category/${blog.category_name}`)"
            >
              <v-icon color="primary">mdi-pound</v-icon>
              {{blog.category_name}}
            </p>
          </template>
        </v-hover>
        <v-card-text class="d-flex text-body-1 text-sm-body-2">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
              class="text-grey-darken-2 my-2 my-sm-0"
            >
              <v-icon color="primary" class="mr-1">mdi-calendar-clock</v-icon>
              <span>Created At &ensp;{{blog.created_time.slice(0, 10)}}</span>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="text-grey-darken-2 text-sm-right my-2 my-sm-0"
            >
<!--              <v-divider vertical class="mx-2"/>-->
              <v-icon color="primary" class="mr-1">mdi-calendar-clock</v-icon>
              <span>Updated At &ensp;{{blog.updated_time.slice(0, 10)}}</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="ml-4"/>
        <v-card-actions class="ml-2 my-2">
          <v-icon color="primary">mdi-tag</v-icon>
          <v-chip
            color="primary"
            class="mx-1"
            v-for="item in blog.tags"
            :key="item.id"
            @click="$router.push(`/tag/${item.name}`)"
          >
            {{item.name}}
          </v-chip>
        </v-card-actions>
        <slot name="action"/>
      </v-col>
      <v-col class="d-none d-sm-flex" sm="4">
        <v-img
          cover
          :src="getImgUrl()"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
