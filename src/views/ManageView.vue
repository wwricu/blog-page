<template>
  <v-app-bar
    style="position:fixed;"
    density="compact">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    bottom
    temporary
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
          @click="$router.push(item.link)"
        />
      </v-list>
    </v-list>
  </v-navigation-drawer>
  <router-view/>
</template>

<script lang="ts">
export default {
  name: "ManageView",
  data: () => ({
    drawer: false,
    group: null,
    manageNavigations: [
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
    ]
  })
}
</script>

<style scoped>

</style>