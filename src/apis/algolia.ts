import axios, {AxiosError, type AxiosRequestConfig, type AxiosResponse} from "axios";


const appId = '94AQK767GX'
const apiKey = 'b82315a387b5cabb8eaaa14fe0bf535d'
const indexName = 'blog_content_index'

const algoliaAxios = axios.create({
    baseURL: `https://${appId}-dsn.algolia.net`,
    timeout: 10000,
})

algoliaAxios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.headers!['x-algolia-application-id'] = appId
        config.headers![' x-algolia-api-key'] = apiKey
        return config
    },
    (error: AxiosError) => {
        console.log(error.message)
        return Promise.reject(error)
    }
)

algoliaAxios.interceptors.response.use(
    (res: AxiosResponse) => {
        return res;
    },
    (error: AxiosError) => {
        return Promise.reject(error.message);
    }
)

export const algoliaSearch = (
    keywords: string | string[],
    success: Function,
    failure: Function | undefined = () => {}
) => {
    // use post to avoid OPTION
    algoliaAxios.request({
        method: 'POST',
        url: `/1/indexes/${indexName}/query`,
        data: {
            params: `query=${keywords}`
        }
    }).then((res: any) => {
        success(res)
    }).catch(failure())
}
