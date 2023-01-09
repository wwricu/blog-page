<script setup lang="ts">
import {PropType, ref} from "vue";
import type {Tag} from '@/types/schemas/tag'
import {modifyCategoryAPI} from "@/apis/category";


const renameDialog = ref(false)
defineExpose({
  switchDialog() {
    renameDialog.value = !renameDialog.value
  }
})

const props = defineProps({
  category: {
    type: Object as PropType<Tag>,
    required: true
  }
})

const newName = ref()
function updateCategory() {
  // alert(JSON.stringify(newName.value))
  let data: Tag = props.category
  data.name = newName.value
  // rename category, id==0
  modifyCategoryAPI(data, () => {
    alert('success')
    renameDialog.value = false
    newName.value = ''
  }, () => {
    alert('failure')
    newName.value = ''
    renameDialog.value = false
  })
}
</script>

<template>
  <v-dialog
    v-model="renameDialog"
    width="400"
  >
    <v-card>
      <v-card-title>
        Rename Category
      </v-card-title>
      <v-text-field
        class="mx-6 mb-n4"
        label="Enter New Name"
        variant="underlined"
        color="primary"
        v-model="newName"
      />
      <v-card-actions>
        <v-spacer/>
        <v-btn
          size="small"
          color="error"
          @click="renameDialog=false"
        >
          Cancel
        </v-btn>
        <v-btn
          size="small"
          color="primary"
          @click="updateCategory()"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
