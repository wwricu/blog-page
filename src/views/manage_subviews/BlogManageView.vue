<script setup lang="ts">
import {ref, Ref} from "vue";
import {useRouter} from "vue-router";

import BlogCard from "@/components/cards/BlogCard.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";

import {getCategoryAPI} from "@/apis/category";
import {deleteContentAPI, getContentPreviewAPI, postContentAPI} from "@/apis/content";
import type {ContentOutput, ResourcePreview} from "@/types/schemas/resource";
import type {Tag} from "@/types/schemas/tag";


let blogs = ref()
const status = ref([
  {
    title: 'draft',
    url: '/draft'
  },
  {
    title: 'public',
    url: '/post'
  }
])
const statusSelect = ref({
  title: 'public',
  url: '/post'
})

const categories: Ref<Array<Tag>> = ref([])
const categorySelect = ref()
const getCategories = () => {
  getCategoryAPI(null, (data: Tag[]) => {
    categories.value = data
  })
}

function getBlogs() {
  let searchParams = {
    parent_url: statusSelect.value.url,
    category_name: undefined
  }
  if (categorySelect.value != null) {
    searchParams.category_name = categorySelect.value.name
  }
  getContentPreviewAPI(searchParams,
      (data: ResourcePreview[]) => {
    blogs.value = data
  })
}

const confirmDialog = ref<boolean>(false)
const blogForDelete = ref<ContentOutput | null>({id: 0, title: ''})
function deleteBlog(blog: ContentOutput) {
  // alert(JSON.stringify(blog))
  blogForDelete.value = blog
  confirmDialog.value = true
}
const confirmDelete = () => {
  deleteContentAPI(blogForDelete.value?.id, () => {
    blogs.value.splice(blogs.value.indexOf(blogForDelete.value), 1)
    blogForDelete.value = null
  },() => {})
  confirmDialog.value = false
}

const router = useRouter()
function newDraft() {
  postContentAPI({
    parent_url: '/draft'
  }, (id: number) => {
    alert('success')
    router.push({path: `/manage/editor/${id}`})
  })
}

const buttons = [
  {
    icon: 'mdi-pencil',
    color: 'indigo',
    handle: () => {
      newDraft()
    }
  },
]

getCategories()
getBlogs()
</script>

<template>
  <v-sheet
    max-width="600"
    class="mx-auto pa-4 sub-view"
  >
    <v-row class="d-flex align-end">
      <v-col cols="6">
        <v-select
          return-object
          item-title="title"
          item-value="url"
          density="compact"
          variant="underlined"
          color="indigo"
          label="Status"
          :items="status"
          v-model="statusSelect"
          @update:model-value="getBlogs()"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          clearable
          return-object
          item-title="name"
          item-value="id"
          density="compact"
          variant="underlined"
          color="indigo"
          label="Category"
          :items="categories"
          v-model="categorySelect"
          @update:model-value="getBlogs()"
        />
      </v-col>
    </v-row>
    <blog-card
      class="mb-4"
      v-for="blog in blogs"
      :key="blog.id"
      :category="blog"
      :blog="blog"
      @delete="deleteBlog(blog)"
    />
    <ConfirmDialog
      v-model="confirmDialog"
      :title="`Delete ${blogForDelete?.title}`"
      color="error"
      @confirm="confirmDelete()"
    />
    <right-bottom-buttons
      :buttons="buttons"
    />
  </v-sheet>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>