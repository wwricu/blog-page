<template>
  <v-layout style="z-index: 0">
    <v-app>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </v-layout>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {getCurrentUserAPI} from "@/apis/user";
import type {UserOutput} from "@/types/schemas/user";
import {useLoginStore} from "@/stores/login";

onMounted(() => {
  if (localStorage.getItem('access_token')) {
    getCurrentUserAPI((data: UserOutput) => {
      const userInfoStore = useLoginStore();
      userInfoStore.login(data)
    })
  }
})
</script>
