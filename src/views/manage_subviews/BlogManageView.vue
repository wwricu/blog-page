<script setup lang="ts">
import {ref, onMounted, Ref} from "vue";
import BlogCard from "@/components/cards/BlogCard.vue";
import {deleteContent, getContentPreview, postContentAPI} from "@/apis/content";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import {useRouter} from "vue-router";
import SwitchButton from "@/components/buttons/SwitchButton.vue";
import {getSubFolders} from "@/apis/folder";
import {ResourcePreview} from "@/types/schemas/resource";

let blogs = ref()
onMounted(() => {
  getCategories()
  getBlogs()
})

const categories: Ref<Array<ResourcePreview>> = ref([])
const categorySelect = ref({
  title: 'draft',
  url: '/draft'
})
const getCategories = () => {
  getSubFolders('/post', (data: ResourcePreview[]) => {
    categories.value = data
    categories.value.push(categorySelect.value)
  }, () => {})
}

function getBlogs() {
  getContentPreview({parent_url: categorySelect.value.url},
      (res: any) => {
    blogs.value = res.data
  }, () => {})
}
function deleteBlog(blog: any) {
  // alert(JSON.stringify(blog))
  deleteContent(blog.id, () => {
    blogs.value.splice(blogs.value.indexOf(blog), 1)
  },() => {})
}

const draftSwitch = ref(true)
function switchDraft() {
  const data = {
    parent_url: '/post'
  }
  draftSwitch.value = !draftSwitch.value
  if (draftSwitch.value === false) {
    data.parent_url = '/draft'
  }
  getContentPreview(data, (res: any)=>{
    blogs.value = res.data
  }, () => {})
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
      <v-col cols="12">
        <v-select
          return-object
          item-title="title"
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