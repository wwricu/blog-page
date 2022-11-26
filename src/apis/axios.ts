import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";
import {refreshTokenAPI} from "@/apis/user";
import {useRouter} from "vue-router";
// import {Base64} from "js-base64";

const myAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 10000,
    withCredentials: true,
});

// const parseJwt = (jwt: string) => {
//     const data = jwt.split('.')[1]
//     return JSON.parse(Base64.decode(data))
// }

myAxios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const access_token = localStorage.getItem("access_token")
        if (access_token && access_token !== '') {
            config.headers!.Authorization = `Bearer ${access_token}`
        }
        const refresh_token = localStorage.getItem("refresh_token")
        if (refresh_token && refresh_token !== '') {
            config.headers!['refresh-token'] = refresh_token
        }
        return config
    },
    (error: any) => {
        console.log(error)
        return Promise.reject(error)
    }
)

myAxios.interceptors.response.use(
    (res: AxiosResponse) => {
        const needRefresh = res.headers['x-token-need-refresh']
        if (needRefresh != null && needRefresh === 'true') {
            console.log('need refresh!')
            refreshTokenAPI()
        }
        return res;
    },

    (error) => {
        let message = "";
        if (error && error.response) {
            switch (error.response.status) {
                case 302:
                    message = "redirected";
                    break;
                case 403:
                    message = "unauthorized"
                    alert('need login!')
                    break;
                default:
                    message = "internal error";
                    break;
            }
        }
        return Promise.reject(message);
    }
);

export default myAxios;