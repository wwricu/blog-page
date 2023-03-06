<script setup lang="ts">
import {ref} from "vue";
import VditorCard from "@/components/cards/VditorCard.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue"
import {modifyContentAPI} from '@/apis/content'


const subEditor = ref()
const buttons = [
  {
    icon: 'mdi-content-save',
    color: 'success',
    handle: () => {
      modifyContentAPI(
        subEditor.value.getEditorContents(),
        () => {
          snackAlert('successfully saved')
      })
    }
  },
]

const snackbar = ref(false)
const snackMsg = ref('')
const snackAlert = (msg: string) => {
  snackMsg.value = msg
  snackbar.value = true
}
</script>

<template>
  <div class="sub-view">
    <vditor-card
      ref="subEditor"
      class="mx-auto"
    />
    <right-bottom-buttons :buttons="buttons"/>
  </div>
  <v-snackbar
    color="success"
    timeout="3000"
    v-model="snackbar"
    transition="slide-y-reverse-transition"
  >
    {{ snackMsg }}
  </v-snackbar>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>