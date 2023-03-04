<script setup lang="ts">
import {computed, Ref, ref, watch, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Ripple} from "vuetify/directives";
import {useDisplay} from 'vuetify'
import BlogCard from "@/components/cards/BlogCard.vue";
import {getContentCountAPI, getContentPreviewAPI} from "@/apis/content";
import type {ResourcePreview, ResourceSearch} from "@/types/schemas/resource";


const vRipple = Ripple
const imgIndexBase = ref(Math.floor(Math.random() * 5))
const route = useRoute()
const router = useRouter()
const blogs = ref()
const blogCount = ref(0)

onMounted(() => {
  init()
})

watch(route, async () => {
  init()
})

const init = () => {
  parseParam()
  getPreviews()
  getPreviewCount()
  searchParams.value = {
    parent_url: '/post' // reset search param
  }
}

const searchParams: Ref<ResourceSearch> = ref({
  parent_url: '/post'
})
const parseParam = () => {
  const filter = route.params.filter as string
  const param = route.params.param as string
  pageIdx.value = 1 // reset pageIdx when re-parse parameters

  if (filter.length !== 0
      && param.length !== 0 && param !== '0') {
    if (filter === 'category') {
      searchParams.value.category_name = encodeURIComponent(param)
      searchParams.value.tag_name = undefined
    } else if (filter === 'tag') {
      searchParams.value.category_name = undefined
      searchParams.value.tag_name = encodeURIComponent(param)
    }
  }
}

const emits = defineEmits(['select'])
const selectCallback = (name: string) => {
  emits('select', name)
}
const getPreviewCount = () => {
  getContentCountAPI(searchParams.value, (data: number) => {
    blogCount.value = data
  })
}
const getPreviews = () => {
  searchParams.value.pageIdx = pageIdx.value - 1 // backend start from 0
  searchParams.value.pageSize = pageSize.value
  window.scrollTo(0,0)
  getContentPreviewAPI(searchParams.value, (data: ResourcePreview[]) => {
    blogs.value = data
  })
}

const pageIdx = ref(1)
const pageSize = ref(5)
const pageLength = computed(() => {
  return Math.ceil(blogCount.value / pageSize.value)
})

const { name } = useDisplay()
const cardWidth = computed(() => {
  switch (name.value) {
    case 'xs':
    case 'sm': return 'w-auto'
  }
  return 800
})
</script>

<template>
  <v-sheet
    :width="cardWidth"
    class="sub-view mx-auto"
  >
    <v-sheet
      class="sub-view"
      min-height="1250px"
    >
      <v-row no-gutters class="mt-2">
        <v-col
          class="pa-2 px-sm-4 px-md-0"
          cols="12"
          v-for="(blog, index) in blogs"
          :key="blog.id"
        >
          <v-hover
            v-slot="{ isHovering, props }"
            close-delay="200"
            open-delay="100"
          >
            <v-lazy
              min-height="200"
              :options="{threshold: .25}"
              transition="scale-transition"
            >
              <blog-card
                v-ripple
                class="mx-auto blog-card"
                v-bind="props"
                :elevation="isHovering ? 24 : 4"
                :blog="blog"
                :cover-index="(index + imgIndexBase) % 5"
                @click.prevent="router.push(`/content/${blog.id}`)"
                @select="selectCallback"
              />
            </v-lazy>
          </v-hover>
        </v-col>
      </v-row>
    </v-sheet >
    <v-pagination
      class="rounded-pill"
      style="background-color: rgba(128, 209, 200, 0.6);"
      color="white"
      active-color="black"
      v-model="pageIdx"
      :length="pageLength"
      :total-visible="10"
      rounded="circle"
      @click="getPreviews()"
    />
  </v-sheet>
</template>

<style scoped>
.sub-view {
  background: transparent;
}
.blog-card {
  cursor: default;
}
/* style="background-color: rgba(128, 209, 200, 0.7);" Tiffany blue */
</style>
