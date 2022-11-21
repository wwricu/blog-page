<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import BlogBigCard from "@/components/cards/BlogBigCard.vue";
import {getContentCountAPI, getContentPreview} from "@/apis/content";

const blogs = ref()
const blogCount = ref()
onMounted(() => {
  getPreviews()
  getContentCountAPI({
    status: 'publish'
  }, (res: any)=>{
    blogCount.value = res.data
  }, ()=>{})
})

const getPreviews = () => {
  getContentPreview({
    status: 'publish',
    pageIdx: pageIdx.value - 1,
    pageSize: pageSize.value,
  }, (res: any) => {
    blogs.value = res.data
  }, ()=>{})
}

const pageIdx = ref(1)
const pageSize = ref(5)
const pageLength = computed(() => {
  return Math.ceil(blogCount.value / pageSize.value)
})
</script>

<template>
  <v-sheet class="sub-view">
  <blog-big-card
    class="mx-auto mt-4"
    v-for="blog in blogs"
    :key="blog.id"
    :blog="blog"
  />
  <v-pagination
    v-model="pageIdx"
    :length="pageLength"
    :total-visible="5"
    rounded="circle"
    class="ma-2"
    @click="getPreviews()"
  />
  </v-sheet>
</template>

<style scoped>
.sub-view {
  background-color: rgba(255, 255, 255, 0);
}
</style>