import myAxios from "@/apis/axios";
import type {Tag} from "@/types/schemas/tag";
import type {AxiosResponse} from "axios";

export const addTagAPI = (name: string,
                         success: Function,
                         failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/tag',
        data: {
            name: name
        }
    }).then((res: any) => {
        success(res)
    })
}

export const getTagAPI = (data: Tag | null,
                          success: Function,
                          failure: Function) => {
    let url = '/tag'
    if (data !== null) {
        url += '&'
        if (data.id !== undefined) {
            url += `id=${data.id}&`
        }
        if (data.name !== undefined) {
            url += `name=${data.name}&`
        }
        url = url.slice(0, -1)
    }
    myAxios.request({
        method: 'GET',
        url: url,
    }).then((res: any) => {
        success(res)
    })
}

export const deleteTagAPI = (id: number,
                             success: Function,
                             failure: Function) => {
    myAxios.request({
        method: 'DELETE',
        url: `/tag/${id}`,
    }).then((res: any) => {
        success(res)
    })
}