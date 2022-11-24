<template>
  <v-layout style="z-index: 0">
    <v-app>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data () {
    return {
      //
    }
  },
})
</script>
