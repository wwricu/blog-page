import { defineStore } from 'pinia'
import {ref} from "vue";
import type {UserOutput} from "@/types/schemas/user";

export const useLoginStore = defineStore('counter', () => {
    const userInfo = ref()
    const isLogin = ref(false)
    const login = (loginUser: UserOutput) => {
        isLogin.value = true
        userInfo.value = loginUser
    }

    return { userInfo, isLogin, login }
})
