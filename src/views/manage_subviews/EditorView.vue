<script setup lang="ts">
import EditorCard from "@/components/cards/EditorCard.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue"
import {deleteContent, modifyContent, postContent} from '@/apis/content'
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const subEditor = ref()
const buttons = [
  {
    icon: 'mdi-cloud-upload',
    color: 'indigo',
    handle: () => {
      postContent(subEditor.value.getEditorContents(),
          () => {},
          ()=>{})
    }
  },
  {
    icon: 'mdi-content-save',
    color: 'success',
    handle: () => {
      modifyContent(subEditor.value.getEditorContents(), ()=>{
        alert('success')
      }, ()=>{})
    }
  },
  {
    icon: 'mdi-delete',
    color: 'error',
    handle: () => {
      deleteContent(subEditor.value.getEditorContents(), ()=>{
        alert('success')
        router.push({path: '/manage/blog'})
      }, ()=>{})
    }
  },
]
</script>

<template>
  <editor-card ref="subEditor" class="mx-auto"/>
  <right-bottom-buttons
    :buttons="buttons"/>
</template>

<style scoped>

</style>