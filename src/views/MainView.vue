<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

import NavigateButton from "@/components/buttons/NavigateButton.vue";
import ListMenu from "@/components/menus/ListMenu.vue";
import TagMenu from "@/components/menus/TagMenu.vue";
import CustomFooter from "@/components/cards/CustomFooter.vue";
import BlogSubview from "@/views/main_subviews/BlogSubview.vue";

import {getCategoryAPI} from "@/apis/category";
import {getTagAPI} from "@/apis/tag";
import type {Tag} from "@/types/schemas/tag";
import bgdImg from "@/assets/background.jpg"


const route = useRoute()
const router = useRouter()
const filter = ref()
onMounted(() => {
  getCategories()
  getTags()
  filter.value = route.params.filter
})

const categories = ref()
const getCategories = () => {
  getCategoryAPI(null, (data: Tag) => {
    categories.value = data
  })
}

const tags = ref()
const getTags = () => {
  getTagAPI({}, (data: Tag[]) => {
    tags.value = data
  })
}

const menu = ref()
const overlay = ref()
const snackMsg = ref('')
const snackbar = ref(false)
const selectTag = (tagName: string) => {
  snackMsg.value = tagName
  snackbar.value = true
}
</script>

<template>
  <v-app-bar
    style="position:fixed;"
    density="compact"
    class="bg-blue-grey-lighten-5"
  >
    <navigate-button
      title="Home"
      prepend-icon="mdi-home"
      @click="router.push('/')"
    />
    <navigate-button
      activator="menu-activator"
      title="Category"
      :menu="menu"
      prepend-icon="mdi-book-open-variant"
      append-icon="mdi-menu-down"
    />
    <list-menu
      activator="#menu-activator"
      :list="categories"
      v-model="menu"
      @select="selectTag"
    />

    <navigate-button
      activator="tag-activator"
      title="Tags"
      :menu="overlay"
      prepend-icon="mdi-tag"
    />
    <tag-menu
      activator="#tag-activator"
      v-model="overlay"
      :tags="tags"
      @select="selectTag"
    />

    <v-spacer/>
    <v-sheet class="d-none d-sm-block bg-transparent">
    <navigate-button
      title="About"
      prepend-icon="mdi-information-outline"
      @click="router.push('/about')"
    />
    </v-sheet>
  </v-app-bar>
  <v-parallax :src="bgdImg">
    <blog-subview
      style="margin-bottom: 10rem;"
      @select="selectTag"
    />
    <custom-footer
      style="position:absolute; bottom:0; left:50%; transform:translateX(-50%);"
    />
  </v-parallax>
  <v-snackbar
    color="indigo"
    timeout="3000"
    v-model="snackbar"
    transition="slide-y-reverse-transition"
  >
    # {{ snackMsg }} selected
  </v-snackbar>
</template>
