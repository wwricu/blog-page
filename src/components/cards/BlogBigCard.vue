<script setup lang="ts">
import type {PropType} from "vue";
import type {ContentOutput} from'@/types/schemas/resource'

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
    width="800"
    rounded="lg"
  >
    <v-row>
      <v-col cols="8" style="opacity: 0.75">
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
              @click="$router.push(`/category/${blog.category_name}`)"
            >
              <v-icon color="primary">mdi-pound</v-icon>
              {{blog.category_name}}
            </p>
          </template>
        </v-hover>
        <v-card-text class="d-flex justify-lg-space-between text-body-2">
          <p class="text-grey-darken-2">
            <v-icon color="primary" class="mr-1">mdi-calendar-clock</v-icon>
            Created At &ensp;{{blog.created_time.slice(0, 10)}}
          </p>
          <v-divider vertical class="mx-2"/>
          <p class="text-grey-darken-2">
            <v-icon color="primary" class="mr-1">mdi-calendar-clock</v-icon>
            Updated At &ensp;{{blog.updated_time.slice(0, 10)}}
          </p>
        </v-card-text>
        <v-divider class="ml-4 mt-n1"/>
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
      <v-col class="d-flex" cols="4">
        <v-img
          cover
          :src="getImgUrl()"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
