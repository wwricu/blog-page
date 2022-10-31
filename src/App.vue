<template>
  <v-layout style="z-index: 0">
    <v-app-bar density="compact">
      <navigate-menu/>
    </v-app-bar>
    <v-app>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigateMenu from "@/components/menus/NavigateMenu.vue";

export default defineComponent({
  name: 'App',
  components: {NavigateMenu},
  data () {
    return {
      //
    }
  },
})
</script>
