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

let menu = ref()
function push(link: String) {
  alert(link)
}
</script>

<template>
  <v-hover close-delay="200">
    <template v-slot:default="{ isHovering, props }">
      <v-btn
          id="menu-activator"
          v-bind="props"
          rounded="pill"
          class="ma-2 pa-n2"
          :color="isHovering || menu ? 'white' : 'primary'"
          :class="isHovering || menu ? 'bg-primary' : 'bg-white'"
      >
        {{ Title }}
        <v-menu
            open-on-hover
            activator="parent"
            transition="scroll-y-transition"
            v-model="menu"
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
      </v-btn>
    </template>
  </v-hover>
</template>

<style scoped>

</style>