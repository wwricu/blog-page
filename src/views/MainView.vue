<script setup lang="ts">
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import ListMenu from "@/components/menus/ListMenu.vue";
import {ref} from "vue";
import TagMenu from "@/components/menus/TagMenu.vue";

let menu = ref()
let overlay = ref()
const folders = ref([
  {
    text: 'C++',
    link: '/C++'
  },
  {
    text: 'Java',
    link: '/Java'
  }
])
const tags = ref([
  {
    text: 'C++',
    link: 'C++'
  },
  {
    text: 'Python',
    link: 'Python'
  },
  {
    text: 'Kernel',
    link: 'Kernel'
  },
  {
    text: 'Trust Zone',
    link: 'Trust Zone'
  },
])
</script>

<template>
  <v-app-bar
    style="position:fixed;"
    density="compact"
  >
    <navigate-button
      activator="menu-activator"
      title="Category"
      :menu="menu"
    />
    <list-menu
      activator="#menu-activator"
      :list="folders"
      v-model="menu"
    />

    <navigate-button
      activator="tag-activator"
      title="Tags"
      :menu="overlay"
    />
    <tag-menu
      activator="#tag-activator"
      v-model="overlay"
      :tags="tags"
    />
  </v-app-bar>
</template>

<style scoped>

</style>