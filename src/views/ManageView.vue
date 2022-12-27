<template>
  <v-navigation-drawer
    rail
    expand-on-hover
    v-model="drawer"
    style="position:fixed; bottom:0; left:0; overflow-y:scroll; z-index: 0"
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
    <template v-slot:append>
      <v-list-item
        class="mr-2 mb-2"
        prepend-icon="mdi-arrow-left-box"
        title="hide menu"
        @click="drawer = false"
      />
    </template>
  </v-navigation-drawer>
  <v-icon
    id="show-menu-btn"
    class="ma-2"
    icon="mdi-arrow-right-box"
    color="grey-darken-2"
    size="x-large"
    v-show="!drawer"
    @click="drawer = true"
  />
  <router-view/>
  <div class="bgd"/>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const drawer = ref(true)
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

#show-menu-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 0;
}
</style>
