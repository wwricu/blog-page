<script setup lang="ts">
import {ref, onMounted} from "vue";
import BlogCard from "@/components/cards/BlogCard.vue";
import {deleteContent, getContentPreview, postContentAPI} from "@/apis/content";
import RightBottomButtons from "@/components/buttons/RightBottomButtons.vue";
import {useRouter} from "vue-router";
import SwitchButton from "@/components/buttons/SwitchButton.vue";

let blogs = ref()
onMounted(() => {
  getBlogs()
})
function getBlogs() {
  getContentPreview({status: 'publish'}, (res: any)=>{
    blogs.value = res.data
  }, ()=>{})
}
function deleteBlog(blog: any) {
  // alert(JSON.stringify(blog))
  deleteContent(blog.id, ()=>{
    blogs.value.splice(blogs.value.indexOf(blog), 1)
  },()=>{})
}

const draftSwitch = ref(true)
function switchDraft() {
  const data = {
    status: 'publish'
  }
  draftSwitch.value = !draftSwitch.value
  if (draftSwitch.value === false) {
    data.status = 'draft'
  }
  getContentPreview(data, (res: any)=>{
    blogs.value = res.data
  }, ()=>{})
}

const router = useRouter()
function newDraft() {
  postContentAPI({
    parent_url: '/draft'
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
    class="mx-auto pa-4 sub-view"
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
    >
      <switch-button
        v-model="draftSwitch"
        true-icon="mdi-checkbox-marked"
        false-icon="mdi-checkbox-blank-off-outline"
        @click="switchDraft()"
      />
    </right-bottom-buttons>
  </v-sheet>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>