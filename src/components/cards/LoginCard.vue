<script setup lang="ts">

import {ref, getCurrentInstance} from "vue";
import { useStore } from "@/stores/global";
import md5 from 'js-md5'

const ctx = getCurrentInstance()!.appContext.config.globalProperties
const store = useStore();

function login() {
  ctx.$http.request({
    method: 'PUT',
    url: '/auth',
    data: {
      userName: loginForm.value[0].value,
      pwdHash: md5(loginForm.value[1].value),
    }
  }).then((res: any) => {
    if (res.data.status === 'success') {
      alert('success')
      store.sysUser = res.data.obj
      console.log(JSON.stringify(store.sysUser))
    }
  })
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