<script setup lang="ts">

import {useRouter} from "vue-router";

const props = defineProps({
  blog: {
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
    <v-card-title>{{blog.title}}</v-card-title>
    <v-card-text class="d-flex">
      <p class="text-grey-darken-2">Created Time: &ensp;</p>
      <p>{{blog.created_time}}</p>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
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
