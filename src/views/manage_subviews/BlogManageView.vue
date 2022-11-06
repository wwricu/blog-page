<script setup lang="ts">
import {ref, onMounted} from "vue";
import CategoryCard from "@/components/cards/CategoryCard.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RenameDialog from "@/components/dialogs/RenameDialog.vue";
import {getSubFolders, postFolder} from "@/apis/folder";
import BlogCard from "@/components/cards/BlogCard.vue";
import {getAllBlog} from "@/apis/content";

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
  alert(JSON.stringify(blog))
}

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
  </v-sheet>
</template>
