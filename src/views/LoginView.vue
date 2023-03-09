<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import type {AxiosError} from "axios";
import {parseJwt, useUserStore} from "@/stores/user";
import {login2FAApi, loginApi} from '@/apis/user'
import CryptoJs from 'crypto-js'
import type {TokenResponse} from "@/types/types";
// should switch to vuetify v-otp-input after being ported
import VOtpInput from 'vue3-otp-input';


const userStore = useUserStore()
const router = useRouter()
const cardTitle = ref('please input OTP you received')
const useMailCode = ref(true)
const loginSuccess = (data: TokenResponse) => {
  router.push('/manage/blog')
  userStore.login(parseJwt(data.access_token))
  userStore.access_token = data.access_token
  userStore.refresh_token = data.refresh_token
  userStore.two_fa_token = null
}

const resetCountDown = ref(30)
const setResendCountDown = () => {
  resetCountDown.value = 30
  const intervalId = setInterval(() => {
    resetCountDown.value -= 1
    if (resetCountDown.value === 0) {
      clearInterval(intervalId)
    }
  }, 1000)
}

const validation = ref(false)
const login = () => {
  if (validation.value !== true) {
    snackbar.value = true
    snackMsg.value = 'please input valid info'
    return
  }
  loginApi(
    {
      username: loginForm.value[0].value,
      password: CryptoJs.SHA256(loginForm.value[1].value).toString()
    },
    loginSuccess,
    (error: AxiosError) => {
      const status_code = error.response?.status
      const detail = (error.response?.data as any)?.detail ?? 'failed to login'
      if (status_code !== 440 && status_code !== 441) { // other errors
        snackAlert(detail)
        return
      }
      cardTitle.value = detail
      useMailCode.value = status_code === 440
      twoFADialog.value = true
      setResendCountDown()
      userStore.two_fa_token = error.response?.headers['x-2fa-token']
    },
  )
}

const otpInput = ref(null)
const otpValue = ref('')
const twoFADialog = ref(false)
const fillOTPValue = (value: string) => {
  otpValue.value = value
}

const twoFALogin = () => {
  if (otpValue.value == null || otpValue.value.length < 6) {
    snackAlert('please complete the otp')
    return
  }
  login2FAApi(
    otpValue.value,
    loginSuccess,
    (error: AxiosError) => {
      const status_code = error.response?.status
      const detail = (error.response?.data as any)?.detail ?? 'failure'
      if (status_code !== 440 && status_code !== 441) {
        snackAlert(detail)
        return
      }
      useMailCode.value = status_code === 440
      userStore.two_fa_token = error.response?.headers['x-2fa-token']
      cardTitle.value = detail
      twoFADialog.value = true
    },
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
        return !!v || 'username is required'
      },
      (v: string) => {
        return !!v && v.length >= 3 && v.length <= 12
          || 'username must >= 3 chars and <= 12 chars'
      },
    ]
  },
  {
    text: 'Password',
    value: '',
    counter: 24,
    type: 'password',
    icon: 'mdi-eye',
    rules: [
      (v: string) => {
        return !!v || 'password is required'
      },
      (v: string) => {
        return !!v && v.length >= 8 && v.length <= 24
          || 'password must >= 8 chars and <= 24 chars'
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

const snackbar = ref(false)
const snackMsg = ref('')
const snackAlert = (msg: string) => {
  snackMsg.value = msg
  snackbar.value = true
}

document.onkeyup = function (event) {
  if (event.ctrlKey || event.shiftKey || event.key !== 'Enter') {
    return
  }
  if (twoFADialog.value === false) {
    login()
    return
  }
  twoFALogin()
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
        <v-form v-model="validation">
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
          />
        </v-form>
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
      persistent
      v-model="twoFADialog"
      width="400"
    >
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          {{ cardTitle }}
          <v-btn
            variant="flat"
            density="compact"
            icon="mdi-window-close"
            @click="twoFADialog=false"
          />
        </v-card-title>
        <v-otp-input
          ref="otpInput"
          class="mx-auto my-6"
          input-classes="otp-input"
          separator=""
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-change="fillOTPValue"
          @on-complete="fillOTPValue"
        />
        <v-card-actions>
          <v-btn
            color="primary"
            density="compact"
            v-show="useMailCode"
            @click="login"
            :disabled="resetCountDown > 0"
          >
            Resend code
            <span v-show="resetCountDown > 0">
              &ensp; after {{resetCountDown }}
            </span>
          </v-btn>
          <v-spacer/>
          <v-btn
            color="primary"
            density="compact"
            @click="twoFALogin"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="error"
      timeout="3000"
      v-model="snackbar"
      transition="slide-y-reverse-transition"
    >
      {{ snackMsg }}
    </v-snackbar>
  </div>
</template>

<style scoped>
#background {
  background-color: #2c3e50;
}
:deep(.otp-input) {
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
