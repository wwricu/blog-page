<script setup lang="ts">
import {onMounted, ref} from "vue";

import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import InputDialog from "@/components/dialogs/InputDialog.vue";
import {addTagAPI, deleteTagAPI, getTagAPI} from "@/apis/tag";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
import type {Tag} from '@/types/schemas/tag'

const chips = ref()
const refreshChips = () => {
  getTagAPI(null, (data: Tag)=>{
    chips.value = data
  }, () => {})
}
onMounted(()=> {
  refreshChips()
})

const confirmSwitch = ref(false)
const chipForDelete = ref()
const showDeleteConfirm = (chip: Tag) => {
  confirmSwitch.value = true
  chipForDelete.value = chip
}
const deleteChip = () => {
  deleteTagAPI(chipForDelete.value.id, () => {
    alert('deleted chip')
    confirmSwitch.value = false
    chips.value.splice(chips.value.indexOf(chipForDelete.value), 1)
  }, () => {})
}

const inputDialog = ref()
const newTagName = ref('')
const confirmHandle = () => {
  addTagAPI(newTagName.value, ()=>{
    alert('success')
    refreshChips()
  }, ()=>{})
}
</script>

<template>
  <v-sheet
    height="100%"
    max-width="800"
    class="d-flex mx-auto justify-center mt-6 sub-view"
  >
    <v-item-group>
      <v-chip
        v-for="item in chips"
        :key="item.id"
        class="ma-2"
        color="primary"
        text-color="white"
        size="large"
        @click="showDeleteConfirm(item)"
      >
        {{item.name}}
      </v-chip>
    </v-item-group>

  </v-sheet>
  <confirm-dialog
    v-model="confirmSwitch"
    @confirm="deleteChip()"
    :title="`Delete ${chipForDelete.name}`"
    color="error"
  />
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
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>