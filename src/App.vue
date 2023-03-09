<script setup lang="ts">
import {onMounted} from "vue";
import {useUserStore} from "@/stores/user";
import {getCurrentUserAPI} from "@/apis/user";
import type {UserOutput} from "@/types/schemas/user";


onMounted(async () => {
  const userStore = useUserStore()
  if (userStore.isLogin) {
    getCurrentUserAPI((data: UserOutput) => {
      userStore.login(data)
    })
  }
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
