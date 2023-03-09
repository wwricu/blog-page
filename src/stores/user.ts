import { defineStore } from 'pinia'
import {ref} from "vue";
import type {UserOutput} from "@/types/schemas/user";
import {Base64} from "js-base64";


export const useUserStore = defineStore(
    'login',
    () => {
        const userInfo = ref()
        const isLogin = ref(false)
        const access_token = ref()
        const refresh_token = ref()
        const two_fa_token = ref()

        const login = (loginUser: UserOutput) => {
            isLogin.value = true
            userInfo.value = loginUser
        }
        const logout = () => {
            isLogin.value = false
            access_token.value = null
            refresh_token.value = null
            two_fa_token.value = null
        }

        return {
            login,
            logout,
            access_token,
            refresh_token,
            two_fa_token,
            userInfo,
            isLogin
        }
    },
    {
        persistedState: {
            persist: true
        }
    },
)

export const parseJwt = (jwt: string): UserOutput => {
    const data = jwt.split('.')[1]
    return JSON.parse(Base64.decode(data))
}
