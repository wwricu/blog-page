<script setup lang="ts">
import {ref} from "vue";

const Title = 'Tech'
const subFolders = ref([
  {
    text: 'C++',
    link: '/C++'
  },
  {
    text: 'Java',
    link: '/Java'
  }
])
function push(link: String) {
  alert(link)
}

</script>
<template>
  <v-menu transition="scroll-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn
          color="primary"
          class="ma-2"
          v-bind="props"
      >
        {{ Title }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="subFolder in subFolders"
          :key="subFolder"
          link
      >
        <v-list-item-title
          @click="push(subFolder.text)"
        >
          {{subFolder.text}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>