<script setup lang="ts">
import {ref, onMounted, Ref} from "vue";
import CategoryCard from "@/components/cards/CategoryCard.vue";
import RenameDialog from "@/components/dialogs/RenameDialog.vue";
import type {Tag} from '@/types/schemas/tag'
import {addCategoryAPI, getCategoryAPI} from "@/apis/category";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
import {deleteTagAPI} from "@/apis/tag";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import InputDialog from "@/components/dialogs/InputDialog.vue";


let categories = ref<Tag[]>([])
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

const inputDialogSwitch = ref()
const confirmNewCategory = (newCategoryName: string) => {
  addCategoryAPI(newCategoryName, () => {
    alert('success')
    getCategories()
  })
  inputDialogSwitch.value = false
}

const renameDialogRef = ref()
const categoryInstance: Ref<Tag> = ref({id: 0, name: ''})
const renameCategory = (category: Tag) => {
  categoryInstance.value = category
  renameDialogRef.value.switchDialog()
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
    categories.value.splice(categories.value.indexOf(categoryForDelete.value), 1)
    confirmDialog.value = false
  })
}
</script>

<template>
  <v-sheet
    max-width="600"
    class="mx-auto pa-4 sub-view"
  >
  <rename-dialog
    ref="renameDialogRef"
    :category="categoryInstance"
  />
  <category-card
    class="mb-4"
    v-for="category in categories"
    :key="category.id"
    :category="category"
    @rename="renameCategory"
    @delete="deleteCategory(category)"
  />
  <ConfirmDialog
    v-model="confirmDialog"
    @confirm="confirmDelete()"
    :title="`Delete ${categoryForDelete.name}`"
    color="error"
  />
  <input-dialog
    v-model="inputDialogSwitch"
    label="new category name"
    @confirm="confirmNewCategory"
  />
  <right-bottom-buttons>
    <v-btn
      density="comfortable"
      color="primary"
      icon="mdi-plus"
      @click="inputDialogSwitch = true"
    />
  </right-bottom-buttons>
  </v-sheet>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>