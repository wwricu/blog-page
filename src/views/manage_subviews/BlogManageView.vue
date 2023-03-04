<script setup lang="ts">
import {ref, Ref, computed, onMounted} from "vue";
import {useRouter} from "vue-router";

import BlogCard from "@/components/cards/BlogCard.vue";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";

import {getCategoryAPI} from "@/apis/category";
import {deleteContentAPI, getContentCountAPI, getContentPreviewAPI, postContentAPI} from "@/apis/content";
import type {ContentOutput, ResourcePreview} from "@/types/schemas/resource";
import type {Tag} from "@/types/schemas/tag";
import {ResourceSearch} from "@/types/schemas/resource";


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

const blogCount = ref(0)
const searchParams: Ref<ResourceSearch> = ref({
  parent_url: statusSelect.value.url
})

const getPreviewCount = () => {
  if (categorySelect.value != null) {
    searchParams.value.category_name = categorySelect.value.name
  }
  getContentCountAPI(searchParams.value,
                    (data: number) => {
    blogCount.value = data
  })
}
function getBlogs() {
  if (categorySelect.value != null) {
    searchParams.value.category_name = categorySelect.value.name
  }
  searchParams.value.pageSize = pageSize.value - 1
  searchParams.value.pageIdx = pageIdx.value
  getContentPreviewAPI(
    searchParams.value,
    (data: ResourcePreview[]) => {
    blogs.value = data
  })
}
const pageIdx = ref(1)
const pageSize = ref(5)
const pageLength = computed(() => {
  return Math.ceil(blogCount.value / pageSize.value)
})

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

onMounted(() => {
  getCategories()
  getPreviewCount()
  getBlogs()
})
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
    <v-pagination
      class="rounded-pill"
      style="background-color: rgba(128, 209, 200, 0.6);"
      color="white"
      active-color="black"
      v-model="pageIdx"
      :length="pageLength"
      :total-visible="10"
      rounded="circle"
      @click="getBlogs"
    />
  </v-sheet>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>