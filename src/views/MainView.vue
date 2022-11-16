<script setup lang="ts">
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import AppbarButton from "@/components/buttons/AppbarButton.vue";
import ListMenu from "@/components/menus/ListMenu.vue";
import {ref} from "vue";

let menu = ref()
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
</script>

<template>
  <v-app-bar
      style="position:fixed;"
      density="compact"
  >
    <navigate-button
      activator="menu-activator"
      :title="'Category'"
      :menu="menu"/>
    <list-menu
      activator="#menu-activator"
      :list="folders"
      v-model="menu"/>
  </v-app-bar>
</template>

<style scoped>

</style>