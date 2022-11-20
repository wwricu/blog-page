<script setup lang="ts">
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import ListMenu from "@/components/menus/ListMenu.vue";
import {ref} from "vue";
import TagMenu from "@/components/menus/TagMenu.vue";
import BlogBigCard from "@/components/cards/BlogBigCard.vue";

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
const blog = ref({
  id: 1,
  title: 'test title1 test title2 test title3 test title4 test title5',
  sub_title: 'test sub title',
  created_time: '2022-12-01',
  updated_time: '2022-12-01',
})
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
      :list="folders"
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
  <blog-big-card
    class="mx-auto mt-4"
    :blog="blog"
  />
  <v-row>
    <v-col cols="2"/>
    <v-col cols="8">
    </v-col>
    <v-col cols="2"/>
  </v-row>
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