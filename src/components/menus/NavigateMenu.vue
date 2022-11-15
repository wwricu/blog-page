<script setup lang="ts">
import {ref} from "vue";

const Title = 'Categories'
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
  <v-hover close-delay="500">
    <template v-slot:default="{ isHovering, props }">
      <v-btn
          id="menu-activator"
          v-bind="props"
          rounded="pill"
          class="ma-2 pa-n2"
          :color="isHovering ? 'white' : 'primary'"
          :class="isHovering ? 'bg-primary' : 'bg-white'"
      >
        {{ Title }}
      </v-btn>
    </template>
  </v-hover>

  <v-menu
      open-on-hover
      activator="#menu-activator"
      transition="scroll-y-transition"
  >
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