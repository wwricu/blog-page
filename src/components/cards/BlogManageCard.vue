<script setup lang="ts">
import type {PropType} from "vue";
import {useRouter} from "vue-router";
import type {ContentOutput} from "@/types/schemas/resource";


const props = defineProps({
  blog: {
    type: Object as PropType<ContentOutput>,
    required: true
  }
})

const router = useRouter()
function modifyBlog() {
  router.push({path: `/manage/editor/${props.blog.id}`})
}

const emit = defineEmits(['delete']);
function deleteBlog() {
  emit('delete', props.blog)
}
</script>

<template>
  <v-card>
    <v-card-title class="text-h5 ma-1">{{blog.title}}</v-card-title>
    <p
      class="d-flex text-body-1 ml-4 mt-4"
    >
      <v-icon color="primary">mdi-pound</v-icon>
      <v-hover>
        <template v-slot="{ isHovering, props }">
          <span
            v-bind="props"
            :class="isHovering ? 'text-indigo-darken-4' : ''"
            class="ml-1"
            style="cursor: pointer"
            @click.stop="selectTag('category', blog.category?.name)"
          >
            {{blog.category?.name}}
            <v-tooltip
              activator="parent"
              location="end"
            >
              click to select {{blog.category?.name}}
            </v-tooltip>
          </span>
        </template>
      </v-hover>
    </p>
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
          <v-icon color="primary" class="mr-1">mdi-calendar-clock</v-icon>
          <span>Updated At &ensp;{{blog.updated_time.slice(0, 10)}}</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="ml-4"/>
    <v-card-actions class="ml-2 my-2 pr-3">
      <v-icon color="primary">mdi-tag</v-icon>
      <v-chip
        color="primary"
        class="mx-1 post-tag"
        v-for="item in blog.tags"
        :key="item.id"
        @click.stop="selectTag('tag', item?.name)"
      >
        {{item?.name}}
        <v-tooltip
          activator="parent"
          location="end"
        >
          click to select {{item?.name}}
        </v-tooltip>
      </v-chip>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="modifyBlog()"
      >
        edit
      </v-btn>
      <v-btn
        color="error"
        @click="deleteBlog()"
      >
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
