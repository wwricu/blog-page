<script setup lang="ts">
import {ref, onMounted, Ref} from "vue";
import BlogCard from "@/components/cards/BlogCard.vue";
import {deleteContentAPI, getContentPreviewAPI, postContentAPI} from "@/apis/content";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import {useRouter} from "vue-router";
import {ResourcePreview} from "@/types/schemas/resource";
import {Tag} from "@/types/schemas/tag";
import {getCategoryAPI} from "@/apis/category";

let blogs = ref()
onMounted(() => {
  getCategories()
  getBlogs()
})

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
  title: 'draft',
  url: '/draft'
})

const categories: Ref<Array<Tag>> = ref([])
const categorySelect = ref()
const getCategories = () => {
  getCategoryAPI(null, (data: Tag[]) => {
    categories.value = data
  }, () => {})
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
  }, () => {})
}
function deleteBlog(blog: any) {
  // alert(JSON.stringify(blog))
  deleteContentAPI(blog.id, () => {
    blogs.value.splice(blogs.value.indexOf(blog), 1)
  },() => {})
}

const router = useRouter()
function newDraft() {
  postContentAPI({
    parent_url: '/draft'
  }, (id: number) => {
    alert('success')
    router.push({path: `/manage/editor/${id}`})
  }, ()=>{})
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
</script>

<template>
  <v-sheet
    max-width="600"
    class="mx-auto pa-4 sub-view"
  >
    <v-row>
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