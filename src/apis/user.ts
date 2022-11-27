import myAxios from "@/apis/axios";
import type {AxiosResponse} from "axios";
import type {TokenResponse} from "@/types/types";
import type {UserOutput} from "@/types/schemas/user";

export const loginApi = (data: any,
                      success: Function,
                      failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/auth',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: data
    }).then((res: any) => {
        success(res)
    })
}

export const refreshTokenAPI = () => {
    myAxios.request({
        method: 'POST',
        url: '/auth/refresh',
    }).then((res: AxiosResponse<TokenResponse>) => {
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
    })
}

export const getCurrentUserAPI = (success: Function) => {
    myAxios.request({
        method: 'GET',
        url: '/auth',
    }).then((res: AxiosResponse<UserOutput>) => {
        success(res)
    })
}
