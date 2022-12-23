<script setup lang="ts">
import EditorCard from "@/components/cards/EditorCard.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue"
import {deleteContent, modifyContentAPI} from '@/apis/content'
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const subEditor = ref()
const buttons = [
  {
    icon: 'mdi-content-save',
    color: 'success',
    handle: () => {
      modifyContentAPI(subEditor.value.getEditorContents(), ()=>{
        alert('saved')
      }, ()=>{})
    }
  },
  {
    icon: 'mdi-delete',
    color: 'error',
    handle: () => {
      deleteContent(subEditor.value.getEditorContents().id, ()=>{
        alert('success')
        router.push({path: '/manage/blog'})
      }, ()=>{})
    }
  },
]
</script>

<template>
  <div class="sub-view">
    <editor-card ref="subEditor" class="mx-auto"/>
    <right-bottom-buttons :buttons="buttons"/>
  </div>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>