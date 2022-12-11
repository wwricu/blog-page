import { defineStore } from 'pinia'
import {ref} from "vue";
import type {UserOutput} from "@/types/schemas/user";
import {Base64} from "js-base64";

export const useLoginStore = defineStore('counter', () => {
    const userInfo = ref()
    const isLogin = ref(false)
    const login = (loginUser: UserOutput) => {
        isLogin.value = true
        userInfo.value = loginUser
    }

    return { userInfo, isLogin, login }
})

export const parseJwt = (jwt: string): UserOutput => {
    const data = jwt.split('.')[1]
    return JSON.parse(Base64.decode(data))
}
