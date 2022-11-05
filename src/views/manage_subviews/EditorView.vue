<script setup lang="ts">
import EditorCard from "@/components/cards/EditorCard.vue";
import {submitBlog} from '@/global/apis'
import {ref} from "vue";

const subEditor = ref()
const buttons = [
  {
    icon: 'mdi-cloud-upload',
    color: 'indigo',
    handle: () => {
      submitBlog(subEditor.value.getEditorContents(),
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
<!--  <div id="background">-->
  <editor-card ref="subEditor" class="mx-auto"/>
  <v-container id="icons">
    <v-row class="flex-column" no-gutters>
      <v-col
        class="mt-2"
        v-for="button in buttons"
        :key="button"
      >
        <v-btn
          density="comfortable"
          :icon="button.icon"
          :color="button.color"
          @click="button.handle"
        />
      </v-col>
    </v-row>
  </v-container>
<!--  </div>-->
</template>

<style scoped>
#icons {
  position: fixed;
  width: auto;
  bottom: 0;
  right: 0;
}
</style>