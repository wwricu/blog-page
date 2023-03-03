<script setup lang="ts">
import {onMounted} from "vue";
import {useLoginStore} from "@/stores/login";
import {getCurrentUserAPI} from "@/apis/user";
import type {UserOutput} from "@/types/schemas/user";
import {algoliaSearch} from "@/apis/algolia";


onMounted(async () => {
  if (localStorage.getItem('access_token')) {
    getCurrentUserAPI((data: UserOutput) => {
      const userInfoStore = useLoginStore()
      userInfoStore.login(data)
    })
  }
  algoliaSearch(
    'l',
    (res: any) => {
      console.log(JSON.stringify(res))
  })
})
</script>

<template>
  <v-layout style="z-index: 0">
    <v-app>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </v-layout>
</template>
