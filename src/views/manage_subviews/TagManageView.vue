<script setup lang="ts">
import {ref} from "vue";

import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import InputDialog from "@/components/dialogs/InputDialog.vue";
import {addTagAPI} from "@/apis/tag";

const chips = ref()
const inputDialog = ref()
const newTagName = ref('')
const confirmHandle = () => {
  addTagAPI(newTagName.value, ()=>{
    alert('success')
  }, ()=>{})
}
</script>

<template>
  <v-chip-group
    class="align-center justify-center"
    transition="scroll-y-transition"
  >
    <v-chip
        v-for="item in chips"
        :key="item.text"
    >
      {{item.text}}
    </v-chip>
  </v-chip-group>
  <input-dialog
    ref="inputDialog"
    v-model="newTagName"
    label="new tag name"
    :confirm-handle="confirmHandle"
  />
  <right-bottom-buttons>
    <v-btn
      density="comfortable"
      color="primary"
      icon="mdi-plus"
      @click="inputDialog.switchDialog()"
    />
  </right-bottom-buttons>
</template>

<style scoped>

</style>