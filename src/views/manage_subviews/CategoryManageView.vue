<script setup lang="ts">
import {ref, onMounted, Ref} from "vue";
import CategoryCard from "@/components/cards/CategoryCard.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RenameDialog from "@/components/dialogs/RenameDialog.vue";
import {getSubFolders, postFolderAPI} from "@/apis/folder";
import type {ResourcePreview} from "@/types/schemas/resource";
import type {Tag} from '@/types/schemas/tag'
import {addCategoryAPI, getCategoryAPI} from "@/apis/category";

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
function newCategory() {
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