<script setup lang="ts">
import {onMounted, ref} from "vue";

import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import InputDialog from "@/components/dialogs/InputDialog.vue";
import {addTagAPI, deleteTagAPI, getTagAPI} from "@/apis/tag";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";

const chips = ref()
const refreshChips = () => {
  getTagAPI(null, (res: any)=>{
    chips.value = res.data
  }, ()=>{})
}
onMounted(()=> {
  refreshChips()
})

const confirmSwitch = ref(false)
const chipForDelete = ref({id: 0, name: null})
const showDeleteConfirm = (chip: any) => {
  confirmSwitch.value = true
  chipForDelete.value = chip
}
const deleteChip = () => {
  deleteTagAPI(chipForDelete.value.id, ()=>{
    alert('deleted chip')
    confirmSwitch.value = false
    chips.value.splice(chips.value.indexOf(chipForDelete.value), 1)
  }, ()=>{})
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
  <v-chip-group
    class="align-center justify-center"
    transition="scroll-y-transition"
  >
    <v-chip
      v-for="item in chips"
      :key="item.id"
      color="error"
      text-color="white"
      @click="showDeleteConfirm(item)"
    >
      {{item.name}}
    </v-chip>
  </v-chip-group>
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

</style>