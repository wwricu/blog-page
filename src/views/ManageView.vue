<template>
  <v-app-bar
    style="position:fixed;"
    density="compact"
    class="bg-blue-grey-lighten-5"
  >
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      color="primary"
    />
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    style="position:fixed; bottom:0; left:0; overflow-y:scroll;"
    bottom
    temporary
    color="blue-grey-lighten-5"
  >
    <v-list
      dense
      rounded
    >
      <v-list density="default" nav>
        <v-list-item
          v-for="item in manageNavigations"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          @click="router.push(item.link)"
        />
      </v-list>
    </v-list>
  </v-navigation-drawer>
  <router-view/>
  <div class="bgd"/>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

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
])
</script>

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
