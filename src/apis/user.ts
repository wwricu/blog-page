import myAxios from "@/apis/axios";
import type {AxiosResponse, AxiosError} from "axios";
import type {TokenResponse} from "@/types/types";
import type {UserOutput, UserInput} from "@/types/schemas/user";

export const loginApi = (
    data: UserInput,
    success: Function,
    failure: Function = ()=>{},
) => {
    myAxios.request({
        method: 'POST',
        url: '/auth',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'two-fa-token': localStorage.getItem('2fa_token'),
        },
        data: data
    }).then((res: AxiosResponse<TokenResponse>) => {
        success(res.data)
    }).catch((err: AxiosError) => {
        failure(err)
    })
}

export const login2FAApi = (
    two_fa_code: string,
    success: Function,
    failure: Function = ()=>{},
) => {
    myAxios.request({
        method: 'POST',
        url: '/auth/2fa',
        headers: {'two-fa-token': localStorage.getItem('2fa_token')},
        data: two_fa_code
    }).then((res: AxiosResponse<TokenResponse>) => {
        success(res.data)
    }).catch((err: AxiosError) => {
        failure(err)
    })
}

export const refreshTokenAPI = () => {
    myAxios.request({
        method: 'POST',
        url: '/auth/refresh',
    }).then((res: AxiosResponse<TokenResponse>) => {
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        console.log('tokens refreshed')
    })
}

export const getCurrentUserAPI = (success: Function,
                                  failure: Function = ()=>{}) => {
    myAxios.request({
        method: 'GET',
        url: '/auth',
    }).then((res: AxiosResponse<UserOutput>) => {
        success(res.data)
    }).catch((err: AxiosError) => {
        failure(err)
    })
}
