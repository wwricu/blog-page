import myAxios from "@/apis/axios";
import type {AxiosResponse, AxiosError} from "axios";
import type {TokenResponse} from "@/types/types";
import type {UserOutput, UserInput} from "@/types/schemas/user";

export const loginApi = (
    data: UserInput,
    success: Function,
    failure: Function = ()=>{},
    two_fa_code: string | undefined = undefined
) => {
    const headers: any = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (two_fa_code !== undefined) {
        headers['two-fa-code'] = two_fa_code
    }

    myAxios.request({
        method: 'POST',
        url: '/auth',
        headers: headers,
        data: data
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
