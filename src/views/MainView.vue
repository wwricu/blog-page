<script setup lang="ts">
import {onMounted, ref} from "vue";
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import ListMenu from "@/components/menus/ListMenu.vue";
import TagMenu from "@/components/menus/TagMenu.vue";
import CustomFooter from "@/components/cards/CustomFooter.vue";
import {getSubFolders} from "@/apis/folder";
import {getTagAPI} from "@/apis/tag";
import {useRoute} from "vue-router";
import bgdImg from "@/assets/background.jpg"

const route = useRoute()
const filter = ref()
const currentId = ref()
onMounted(() => {
  getCategories()
  getTags()
  filter.value = route.params.filter
  currentId.value = route.params.id
})

const categories = ref()
const getCategories = () => {
  getSubFolders((res: any)=>{
    categories.value = res.data
  }, ()=>{})
}

const tags = ref()
const getTags = () => {
  getTagAPI({}, (res: any)=>{
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
      @click="$router.push('/')"
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
  <v-parallax :src="bgdImg">
    <router-view/>
    <custom-footer class="mt-8"/>
  </v-parallax>
</template>

<style scoped>
</style>