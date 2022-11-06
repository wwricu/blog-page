<script setup lang="ts">
import EditorCard from "@/components/cards/EditorCard.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue"
import {postContent} from '@/apis/content'
import {ref} from "vue";

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
    }
  },
  {
    icon: 'mdi-delete',
    color: 'error',
    handle: () => {
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