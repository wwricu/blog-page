<script setup lang="ts">
import {ref, onMounted} from "vue";
import CategoryCard from "@/components/cards/CategoryCard.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RenameDialog from "@/components/dialogs/RenameDialog.vue";
import {getSubFolders, postFolder} from "@/apis/folder";

let categories = ref()
onMounted(() => {
  getCategories()
})
function getCategories() {
  getSubFolders((res: any)=>{
    categories.value = res.data
  }, ()=>{})
}

let newCategoryName = ref('')
function newCategory() {
  postFolder({
    title: newCategoryName.value,
    parent_id: 1
  }, ()=>{
    alert('success')
    getCategories()
  }, ()=>{})
}

const renameDialog = ref()
const categoryInstance = ref()
const renameCategory = (category: any) => {
  categoryInstance.value = category
  renameDialog.value.switchDialog()
}
</script>

<template>
  <v-sheet
    max-width="600"
    class="mx-auto pa-4 sub-view"
  >
    <rename-dialog
      ref="renameDialog"
      :category="categoryInstance"
    />
    <v-row no-gutters>
      <v-col cols="8" class="align-self-end">
        <v-text-field
          color="primary"
          variant="underlined"
          label="Category Name"
          v-model="newCategoryName"
          class="mr-2"
        />
      </v-col>
      <v-col
        cols="4"
        class="align-self-center mb-2"
      >
        <v-btn
          color="primary"
          @click="newCategory()"
        >
          Add new category
        </v-btn>
      </v-col>
    </v-row>
  <category-card
    class="mb-4"
    v-for="category in categories"
    :key="category.id"
    :category="category"
    @rename="renameCategory"
  />
  </v-sheet>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>