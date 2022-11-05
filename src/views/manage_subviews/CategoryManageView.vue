<script setup lang="ts">
import {getCurrentInstance, ref, onMounted} from "vue";
import CategoryCard from "@/components/cards/CategoryCard.vue";
const ctx = getCurrentInstance()!.appContext.config.globalProperties

let categories = ref()
onMounted(() => {
  getCategories()
})
function getCategories() {
  ctx.$http.request({
    method: 'GET',
    url: 'http://localhost:8443/resource/subResources?url=',
  }).then((res: any) => {
    if (res.data.status === 'success') {
      categories.value = res.data.obj
    }
  })
}

let newCategoryName = ref('')
function newCategory() {
  ctx.$http.request({
    method: 'POST',
    url: 'http://localhost:8443/resource',
    data: {
      title: newCategoryName.value,
      parent: {
        id: 1
      }
    }
  })
}

</script>

<template>
  <v-sheet
    max-width="600"
    class="mx-auto pa-4"
  >
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
  />
  </v-sheet>
</template>
