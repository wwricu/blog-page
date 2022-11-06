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

<script setup lang="ts">
import {ref} from "vue";
import {putFolder} from '@/apis/folder';

const renameDialog = ref(false)

defineExpose({
  switchDialog() {
    renameDialog.value = !renameDialog.value
  }
})

const props = defineProps({
  category: {
    required: true
  }
})

const newName = ref()
function updateCategory() {
  // alert(JSON.stringify(newName.value))
  let data: any = props.category
  data.title = newName.value
  // rename category, id==0
  putFolder(data, ()=>{
    alert('success')
    renameDialog.value = false
  }, ()=>{
    alert('failure')
    renameDialog.value = false
  })
}

</script>

<style scoped>

</style>