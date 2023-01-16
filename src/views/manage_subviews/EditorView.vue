<script setup lang="ts">
import VditorCard from "@/components/cards/VditorCard.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue"
import {modifyContentAPI} from '@/apis/content'
import {ref} from "vue";


const subEditor = ref()
const buttons = [
  {
    icon: 'mdi-content-save',
    color: 'success',
    handle: () => {
      modifyContentAPI(subEditor.value.getEditorContents(), () => {
        alert('saved')
      })
    }
  },
]
</script>

<template>
  <div class="sub-view">
    <vditor-card
      ref="subEditor"
      class="mx-auto"
      style="z-index:50"
    />
    <right-bottom-buttons :buttons="buttons"/>
  </div>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>