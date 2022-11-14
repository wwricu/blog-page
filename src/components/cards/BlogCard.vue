<script setup lang="ts">
import {getCurrentInstance} from "vue";
import {deleteFolder} from "@/apis/folder";

const props = defineProps({
  blog: {
    required: true
  }
})

function modifyBlog() {
  alert('not implemented')
}

const emit = defineEmits(['delete']);
function deleteBlog() {
  emit('delete', props.blog)
}

const instance = getCurrentInstance();

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
