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
import type {AxiosResponse} from "axios";
import type {UserOutput} from "@/types/schemas/user";
import {useInfoStore} from "@/stores/UserInfo";

export default defineComponent({
  name: 'App',
  data () {
    return {
      //
    }
  },
  mounted() {
    getCurrentUserAPI((res: AxiosResponse<UserOutput>) => {
      const userInfoStore = useInfoStore();
      userInfoStore.login(res.data)
    })
  }
})
</script>
