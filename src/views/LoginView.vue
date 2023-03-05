<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import type {AxiosError} from "axios";
import {parseJwt, useLoginStore} from "@/stores/login";
import {loginApi} from '@/apis/user'
import CryptoJs from 'crypto-js'
import type {TokenResponse} from "@/types/types";
// should switch to vuetify v-otp-input after being ported
import VOtpInput from 'vue3-otp-input';


const userInfoStore = useLoginStore();
const router = useRouter()
const cardTitle = ref('please input OTP you received')

const login = (two_fa_code: string | undefined = undefined) => {
  loginApi(
    {
      username: loginForm.value[0].value,
      password: CryptoJs.SHA256(loginForm.value[1].value).toString()
    },
    (data: TokenResponse) => {
      router.push('/manage/blog')
      userInfoStore.login(parseJwt(data.access_token))
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
    },
    (error: AxiosError) => {
      const status_code = error.response!.status
      const detail = (error.response!.data as any).detail
      if (status_code === 440 || status_code === 441) {
        cardTitle.value = detail
        twoFADialog.value = true
        return
      }
      alert(detail)
    },
    two_fa_code
  )
}

const loginForm = ref([
  {
    text: 'User Name',
    value: '',
    counter: 12,
    type: 'text',
    icon: '',
    rules: [
      (v: string) => {
        return !!v || 'This field is required'
      },
      (v: string) => {
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
      (v: string) => {
        return !!v || 'This field is required'
      },
      (v: string) => {
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

const otpInput = ref(null)
const otpValue = ref('')
const twoFADialog = ref(false)

const handleOnChange = (value: string) => {
  otpValue.value = value
}
const twoFALogin = () => {
  if (otpValue.value == null || otpValue.value.length < 6) {
    alert('please complete the otp')
    return
  }
  login(otpValue.value)
}
</script>

<template>
  <div id="background" class="fill-height pt-16">
    <v-card
      max-width="400px"
      max-height="600px"
      class="bg-grey-lighten-4 mt-16 mx-auto"
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
          @click="login"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="twoFADialog"
      width="400"
    >
      <v-card>
        <v-card-title>{{ cardTitle }}</v-card-title>
        <v-otp-input
          ref="otpInput"
          class="mx-auto my-6"
          input-classes="otp-input"
          separator=""
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-change="handleOnChange"
        />
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            @click="twoFALogin"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
#background {
  background-color: #2c3e50;
}
>>> .otp-input {
   width: 40px;
   height: 60px;
   padding: 5px;
   margin: 0 10px;
   font-size: 20px;
   border-radius: 4px;
   border: 1px solid rgba(0, 0, 0, 0.3);
   text-align: center;
 }
/* Background colour of an input field with value */
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
