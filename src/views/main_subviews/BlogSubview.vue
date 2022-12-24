<script setup lang="ts">
import {computed, onMounted, Ref, ref, watch} from "vue";
import BlogBigCard from "@/components/cards/BlogBigCard.vue";
import {getContentCountAPI, getContentPreview} from "@/apis/content";
import {useRoute} from "vue-router";
import {ResourceSearch} from "@/types/schemas/resource";

const imgIndexBase = ref(0)
const route = useRoute()
const blogs = ref()
const blogCount = ref(0)
onMounted(() => {
  imgIndexBase.value = Math.floor(Math.random() * 5)
  init()
})

watch(route, async () => {
  init()
})

const init = () => {
  parseParam()
  getPreviews()
  getPreviewCount()
}

const searchParams: Ref<ResourceSearch> = ref({
  parent_url: '',
  tag_id: 0
})
const parseParam = () => {
  const filter = route.params.filter as string
  const param = route.params.param as string
  if (filter.length !== 0
      && param.length !== 0 && param !== '0') {
    if (filter === 'post') {
      searchParams.value.parent_url = `/post/${param}`
    } else if (filter === 'tag') {
      searchParams.value.tag_id = param
    }
  }
}

const getPreviewCount = () => {
  getContentCountAPI(searchParams.value, (data: number) => {
    blogCount.value = data
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
  <v-sheet
    class="sub-view"
    min-height="1250px"
  >
    <v-row no-gutters>
      <v-col
        class="mt-4"
        cols="12"
        v-for="(blog, index) in blogs"
        :key="blog.id"
      >
        <v-hover
          v-slot:default="{ isHovering, props }"
          close-delay="200"
          open-delay="100"
        >
          <v-lazy
            min-height="200"
            :options="{threshold: .25}"
            transition="scale-transition"
          >
            <blog-big-card
              v-ripple
              class="mx-auto"
              v-bind="props"
              :elevation="isHovering ? 24 : 4"
              :blog="blog"
              :cover-index="(index + imgIndexBase) % 5"
            />
          </v-lazy>
        </v-hover>
      </v-col>
    </v-row>

  </v-sheet>
  <v-pagination
    color="white"
    active-color="blue"
    v-model="pageIdx"
    :length="pageLength"
    :total-visible="5"
    rounded="circle"
    class="ma-2"
    @click="getPreviews()"
  />
</template>

<style scoped>
.sub-view {
  background: transparent;
}
</style>
