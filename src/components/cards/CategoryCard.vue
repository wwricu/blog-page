<script setup lang="ts">
import {getCurrentInstance} from "vue";
import {deleteFolder} from "@/apis/folder";

const props = defineProps({
  category: {
    required: true
  }
})

const emit = defineEmits(['rename']);
function renameCategory() {
  emit('rename', props.category)
}

const instance = getCurrentInstance();
function deleteCategory() {
  deleteFolder(props.category, ()=>{
    alert('deleted')
    instance?.proxy?.$forceUpdate();
  }, ()=>{})
}
</script>

<template>
  <v-card>
    <v-card-title>{{category.title}}</v-card-title>
    <v-card-text class="d-flex">
        <p class="text-grey-darken-2">Created Time: &ensp;</p>
        <p>{{category.createdTime}}</p>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="renameCategory()"
      >
        rename
      </v-btn>
      <v-btn
        color="error"
        @click="deleteCategory()"
      >
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
