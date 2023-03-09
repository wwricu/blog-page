<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import NavigateButton from "@/components/buttons/NavigateButton.vue";
import {useUserStore} from "@/stores/user";


const drawer = ref(false)
const router = useRouter()
const host = ref('')
host.value = `${document.location.protocol}//${window.location.host}`

const push = (link: string) => {
  router.push(link)
}
const open = (url: string) => {
  window.open(url, '_blank')
}
const logout = () => {
  useUserStore().logout()
  router.push('/')
}

const manageNavigations = ref([
  {
    title: 'Manage Blogs',
    prependIcon: 'mdi-pencil-outline',
    link: '/manage/blog',
    clickHandle: push
  },
  {
    title: 'Manage Categories',
    prependIcon: 'mdi-format-list-bulleted',
    link: '/manage/category',
    clickHandle: push
  },
  {
    title: 'Manage Tags',
    prependIcon: 'mdi-tag-outline',
    link: '/manage/tag',
    clickHandle: push
  },
  {
    title: 'Alist',
    prependIcon: 'mdi-file-cabinet',
    appendIcon: 'mdi-open-in-new',
    link: `${host.value}/alist`,
    clickHandle: open
  },
  {
    title: 'Waline',
    prependIcon: 'mdi-comment-minus-outline',
    appendIcon: 'mdi-open-in-new',
    link: `${host.value}/waline/ui`,
    clickHandle: open
  },
  {
    title: 'Sqladmin',
    prependIcon: 'mdi-account-outline',
    appendIcon: 'mdi-open-in-new',
    link: `${host.value}${import.meta.env.VITE_PROXY_PATH}/admin`,
    clickHandle: open
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
        :prepend-icon="item.prependIcon"
        :append-icon="item.appendIcon"
        :title="item.title"
        :value="item.title"
        @click="item.clickHandle(item.link)"
      />
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout">
          Logout
        </v-btn>
      </div>
    </template>
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
