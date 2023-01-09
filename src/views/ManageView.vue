<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useDisplay} from "vuetify";


const { name } = useDisplay()
const isMobile = ref(false)
const zIndex = ref(0)

const adjustMenu = async () => {
  if (name.value === 'xs') {
    isMobile.value = true
    drawer.value = false
    zIndex.value = 100
    return
  }

  zIndex.value = 0
  isMobile.value = false
  drawer.value = true
}
watch(name, adjustMenu)
onMounted(() => {
  adjustMenu()
})

const drawer = ref(true)
const rail = ref(true)
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

<template>
  <v-app-bar
    density="compact"
    color="blue-grey-lighten-5"
    v-if="isMobile"
    style="position: fixed; z-index: 15"
  >
    <v-app-bar-nav-icon
      color="primary"
      @click="drawer = !drawer"
    />
  </v-app-bar>
  <v-navigation-drawer
    permanent
    v-model="drawer"
    :rail="!isMobile && rail"
    color="blue-grey-lighten-5"
    style="position:fixed;bottom:0;left:0;overflow-y:scroll;z-index:10"
  >
    <v-list
      nav
      dense
      rounded
    >
      <v-list-item
        nav
        v-if="!isMobile"
        @click.stop="rail = !rail"
        title="Collapse"
      >
        <template v-slot:prepend>
          <v-icon
            v-show="rail"
            icon="mdi-menu"
          />
        </template>
        <template v-slot:append>
          <v-icon
            v-show="!rail"
            icon="mdi-arrow-left"
          />
        </template>
      </v-list-item>
      <v-divider v-if="!isMobile"/>
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
