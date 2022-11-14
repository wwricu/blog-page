<script setup lang="ts">
import {ref, onMounted} from "vue";
import CategoryCard from "@/components/cards/CategoryCard.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RenameDialog from "@/components/dialogs/RenameDialog.vue";
import {getSubFolders, postFolder} from "@/apis/folder";
import BlogCard from "@/components/cards/BlogCard.vue";
import {deleteContent, getAllBlog, postContent} from "@/apis/content";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import {useRouter} from "vue-router";

let blogs = ref()
onMounted(() => {
  getBlogs()
})
function getBlogs() {
  getAllBlog((res: any)=>{
    blogs.value = res.data.obj
  }, ()=>{})
}
function deleteBlog(blog: any) {
  // alert(JSON.stringify(blog))
  deleteContent(blog, ()=>{
    blogs.value.splice(blogs.value.indexOf(blog), 1)
  },()=>{})
}

const router = useRouter()
function newDraft() {
  postContent({
    status: 'draft'
  }, (res: any)=>{
    alert('success')
    router.push({path: `/manage/editor/${res.data.id}`})
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
      class="mx-auto pa-4"
  >
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
