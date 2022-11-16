<script setup lang="ts">
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import AppbarButton from "@/components/buttons/AppbarButton.vue";
import ListMenu from "@/components/menus/ListMenu.vue";
import {ref} from "vue";

let menu = ref()
</script>

<template>
  <v-app-bar
      style="position:fixed;"
      density="compact"
  >
    <navigate-button id="menu-activator" :menu="menu"/>
    <list-menu activator="#menu-activator" v-model="menu"/>
    <appbar-button/>
  </v-app-bar>
</template>

<style scoped>

</style>