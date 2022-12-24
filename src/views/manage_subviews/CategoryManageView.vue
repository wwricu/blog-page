<script setup lang="ts">
import {ref, onMounted, Ref} from "vue";
import CategoryCard from "@/components/cards/CategoryCard.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RenameDialog from "@/components/dialogs/RenameDialog.vue";
import type {Tag} from '@/types/schemas/tag'
import {addCategoryAPI, getCategoryAPI} from "@/apis/category";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
import {deleteTagAPI} from "@/apis/tag";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import InputDialog from "@/components/dialogs/InputDialog.vue";

let categories = ref()
onMounted(() => {
  getCategories()
})
function getCategories() {
  getCategoryAPI(null,
      (data: Tag[]) => {
        categories.value = data
      },
      () => {})
}

let newCategoryName = ref('')
const inputDialog = ref()

const confirmNewCategory = () => {
  addCategoryAPI(newCategoryName.value, () => {
    alert('success')
    getCategories()
  }, () => {})
}

const renameDialog = ref()
const categoryInstance: Ref<Tag> = ref({id: 0, name: ''})
const renameCategory = (category: Tag) => {
  categoryInstance.value = category
  renameDialog.value.switchDialog()
}

const confirmDialog: Ref<boolean> = ref(false)
const categoryForDelete: Ref<Tag> = ref({id: 0, name: ''})
const deleteCategory = (category: Tag) => {
  categoryForDelete.value = category
  confirmDialog.value = true
}

const confirmDelete = () => {
  deleteTagAPI(categoryForDelete.value.id,
  () => {
    categories.value.splice(categories.value.indexOf(categoryForDelete), 1)
    confirmDialog.value = false
    newCategoryName.value = ''
  }, () => {})
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
  <category-card
    class="mb-4"
    v-for="category in categories"
    :key="category.id"
    :category="category"
    @rename="renameCategory"
    @delete="deleteCategory"
  />
  <confirm-dialog
    v-model="confirmDialog"
    @confirm="confirmDelete()"
    :title="`Delete ${categoryForDelete.name}`"
    color="error"
  />
  <input-dialog
    ref="inputDialog"
    v-model="newCategoryName"
    label="new category name"
    :confirm-handle="confirmNewCategory"
  />
  <right-bottom-buttons>
    <v-btn
      density="comfortable"
      color="primary"
      icon="mdi-plus"
      @click="inputDialog.switchDialog()"
    />
  </right-bottom-buttons>
  </v-sheet>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>