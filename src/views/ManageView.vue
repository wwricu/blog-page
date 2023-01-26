<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import NavigateButton from "@/components/buttons/NavigateButton.vue";


const drawer = ref(false)
const router = useRouter()
const manageNavigations = ref([
  {
    title: 'Home',
    icon: 'mdi-home',
    link: '/'
  },
  {
    title: 'Manage Blogs',
    icon: 'mdi-pencil',
    link: '/manage/blog'
  },
  {
    title: 'Manage Categories',
    icon: 'mdi-view-dashboard',
    link: '/manage/category'
  },
  {
    title: 'Manage Tags',
    icon: 'mdi-tag',
    link: '/manage/tag'
  },
  {
    title: 'Manage Comments',
    icon: 'mdi-comment',
    link: '/waline/ui'
  },
])
</script>

<template>
  <v-app-bar
    density="compact"
    color="blue-grey-lighten-5"
    style="position: fixed"
  >
    <v-app-bar-nav-icon
      color="primary"
      @click="drawer = !drawer"
    />
    <navigate-button
      title="Home"
      prepend-icon="mdi-home"
      @click="router.push('/')"
    />
    <v-spacer/>
    <navigate-button
      title="About"
      prepend-icon="mdi-information-outline"
      @click="router.push('/about')"
    />
  </v-app-bar>
  <v-navigation-drawer
    temporary
    v-model="drawer"
    color="blue-grey-lighten-5"
    style="position:fixed;bottom:0;left:0;overflow-y:scroll;"
  >
    <v-list
      nav
      dense
      rounded
    >
      <v-list-item
        nav
        v-for="item in manageNavigations"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.title"
        @click="router.push(item.link)"
      />
    </v-list>
  </v-navigation-drawer>
  <router-view/>
  <div class="bgd"/>
</template>

<style scoped>
.bgd {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
  background-image: linear-gradient(to right bottom, #ace0f9 0%, #fff1eb 100%);
}
</style>
