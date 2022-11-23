<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import BlogBigCard from "@/components/cards/BlogBigCard.vue";
import {getContentCountAPI, getContentPreview} from "@/apis/content";
import {useRoute} from "vue-router";

const route = useRoute()
const blogs = ref()
const blogCount = ref()
onMounted(() => {
  init()
})

watch(route, async () => {
  init()
}, {immediate:true})

const init = () => {
  parseParam()
  getPreviews()
  getPreviewCount()
}

const searchParams = ref()
const parseParam = () => {
  searchParams.value = {
    status: 'publish',
  }
  const filter = route.params.filter as string
  const id = route.params.id as string
  if (filter.length !== 0
      && id.length !== 0 && id !== '0') {
    if (filter === 'category') {
      searchParams.value.parent_id = id
    } else if (filter === 'tag') {
      searchParams.value.tag_id = id
    }
  }
}

const getPreviewCount = () => {
  getContentCountAPI(searchParams.value, (res: any) => {
    blogCount.value = res.data
  }, ()=>{})
}

const getPreviews = () => {
  searchParams.value.pageIdx = pageIdx.value - 1
  searchParams.value.pageSize = pageSize.value

  getContentPreview(searchParams.value, (res: any) => {
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