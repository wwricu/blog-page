<template>
  <v-app-bar density="compact">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
            :value="item.title"/>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  name: "ManageView",
  data: () => ({
    drawer: false,
    group: null,
    manageNavigations: [
      {
        title: 'New Article',
        icon: 'mdi-pencil',
        link: '/editor'
      },
      {
        title: 'Manage Categories',
        icon: 'mdi-view-dashboard',
        link: 'categories'
      },
    ]
  })
}
</script>

<style scoped>

</style>