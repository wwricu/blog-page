<template>
  <v-dialog
    v-model="renameDialog"
  >
    <v-card>
      <v-card-title>
        Rename Category
      </v-card-title>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="error"
          @click="renameDialog=false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="updateCategory()"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {updateFolder} from "@/global/apis";

const renameDialog = ref(false)
function switchDialog() {
  renameDialog.value = !renameDialog.value
}

const props = defineProps({
  folder: {
    required: true
  }
})
const newName = ref()

function updateCategory() {
  let data = props.folder
  data.title = newName.value
  updateFolder(data, ()=>{}, ()=>{})
}

</script>

<style scoped>

</style>