<script setup lang="ts">
import {getCurrentInstance, PropType} from "vue";
import {deleteFolderAPI} from "@/apis/folder";
import type {FolderOutput} from "@/types/schemas/resource";

const props = defineProps({
  category: {
    type: Object as PropType<FolderOutput>,
    required: true
  }
})

const emit = defineEmits(['rename']);
function renameCategory() {
  emit('rename', props.category)
}

const instance = getCurrentInstance();
function deleteCategory() {
  deleteFolderAPI(props.category.id as number, ()=>{
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
      <p>{{category.created_time}}</p>
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
