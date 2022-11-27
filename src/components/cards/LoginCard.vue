<script setup lang="ts">

import {ref, getCurrentInstance} from "vue";
import {useInfoStore} from "@/stores/UserInfo";
import {Md5} from 'ts-md5/dist/esm/md5';
import {loginApi} from '@/apis/user'
import type {TokenResponse} from "@/types/types";
import type {AxiosResponse} from "axios";
import {useRouter} from "vue-router";
import {Base64} from "js-base64";
import type {UserOutput} from "@/types/schemas/user";

const ctx = getCurrentInstance()!.appContext.config.globalProperties
const userInfoStore = useInfoStore();
const router = useRouter()

const parseJwt = (jwt: string): UserOutput => {
    const data = jwt.split('.')[1]
    alert(JSON.stringify(data))
    return JSON.parse(Base64.decode(data))
}

function login() {
  loginApi({
    username: loginForm.value[0].value,
    password: Md5.hashStr(loginForm.value[1].value)
  }, (res: AxiosResponse<TokenResponse>) => {
    // alert(JSON.stringify(parseJwt(res.data.access_token)))
    router.push('/manage/blog')
    userInfoStore.login(parseJwt(res.data.access_token))
    localStorage.setItem('access_token', res.data.access_token)
    localStorage.setItem('refresh_token', res.data.refresh_token)
  }, ()=>{})
}

const loginForm = ref([
  {
    text: 'User Name',
    value: '',
    counter: 12,
    type: 'text',
    icon: '',
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
    type: 'password',
    icon: 'mdi-eye',
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

function iconClick(item: typeof loginForm.value[0]) {
  if (item.icon === 'mdi-eye') {
    item.icon = 'mdi-eye-off'
    item.type = 'text'
  } else if (item.icon === 'mdi-eye-off') {
    item.icon = 'mdi-eye'
    item.type = 'password'
  }
}

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
        :type="item.type"
        :append-inner-icon="item.icon"
        v-for="item in loginForm"
        :key="item.text"
        :label="item.text"
        :counter="item.counter"
        :rules="item.rules"
        v-model="item.value"
        class="ml-1 mr-1"
        @click:appendInner="iconClick(item)"
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