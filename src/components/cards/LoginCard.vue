<script setup lang="ts">

import {ref, getCurrentInstance} from "vue";
import { useStore } from "@/stores";
import {Md5} from 'ts-md5/dist/esm/md5';
import {loginApi} from '@/apis/user'

const ctx = getCurrentInstance()!.appContext.config.globalProperties
const store = useStore();

function login() {
  loginApi({
    username: loginForm.value[0].value,
    password: Md5.hashStr(loginForm.value[1].value)
  }, (res: any)=>{
    localStorage.setItem('access_token', res.data.access_token)
  }, ()=>{})
}
const loginForm = ref([
  {
    text: 'User Name',
    value: '',
    counter: 12,
    rules: [
      (v:String) => {
        return !!v || 'This field is required'
      },
      (v:String) => {
        return !!v && v.length <= 12
            || 'Username must be less than 12 chars'
      },
    ]
  },
  {
    text: 'Password',
    value: '',
    counter: 25,
    rules: [
      (v:String) => {
        return !!v || 'This field is required'
      },
      (v:String) => {
        return !!v && v.length <= 25
            || 'Username must be less than 25 chars'
      },
    ]
  }
])

</script>

<template>
  <v-card
    max-width="400px"
    max-height="600px"
    class="bg-grey-lighten-4 mt-16"
  >
    <v-card-text>
      <v-text-field
          variant="underlined"
          color="indigo"
          v-for="item in loginForm"
          :key="item.text"
          :label="item.text"
          :counter="item.counter"
          :rules="item.rules"
          v-model="item.value"
          class="ml-1 mr-1"
      >
      </v-text-field>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        density="compact"
        color="indigo"
        @click="login()"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>