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
import {getCurrentUserAPI} from "@/apis/user";
import type {UserOutput} from "@/types/schemas/user";
import {useLoginStore} from "@/stores/login";

export default defineComponent({
  name: 'App',
  data () {
    return {
      //
    }
  },
  mounted() {
    if (localStorage.getItem('access_token')) {
      getCurrentUserAPI((data: UserOutput) => {
        const userInfoStore = useLoginStore();
        userInfoStore.login(data)
      })
    }
  }
})
</script>
