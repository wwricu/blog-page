<script setup lang="ts">
import {onMounted, ref} from "vue";

import NavigateButton from "@/components/buttons/NavigateButton.vue";
import ListMenu from "@/components/menus/ListMenu.vue";
import TagMenu from "@/components/menus/TagMenu.vue";
import BlogSubview from "@/views/main_subviews/BlogSubview.vue";
import {getSubFolders} from "@/apis/folder";
import {getTagAPI} from "@/apis/tag";

let categories = ref()
let tags = ref()
onMounted(() => {
  getCategories()
  getTags()
})
const getCategories = () => {
  getSubFolders((res: any)=>{
    categories.value = res.data
  }, ()=>{})
}
const getTags = () => {
  getTagAPI(null, (res: any)=>{
    tags.value = res.data
  }, ()=>{})
}

const menu = ref()
const overlay = ref()
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
    />

    <v-spacer/>
    <navigate-button
      title="About"
      prepend-icon="mdi-information-outline"
    />
  </v-app-bar>
  <div class="bgd"/>
  <blog-subview class="mx-auto"/>
</template>

<style scoped>
.bgd {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right bottom, #ace0f9 0%, #fff1eb 100%);
}
</style>