<script setup lang="ts">
import NavigateMenu from "@/components/menus/NavigateMenu.vue";
import AppbarButton from "@/components/buttons/AppbarButton.vue";
</script>

<template>
  <v-app-bar
      style="position:fixed;"
      density="compact"
  >
    <navigate-menu/>
    <appbar-button/>
  </v-app-bar>
</template>

<style scoped>

</style>