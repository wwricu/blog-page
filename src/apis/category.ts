import myAxios from "@/apis/axios";
import type {AxiosResponse} from "axios";
import type {Tag} from "@/types/schemas/tag";

export const addCategoryAPI = (name: string,
                               success: Function,
                               failure: Function | undefined) => {
    myAxios.request({
        method: 'POST',
        url: '/category',
        data: { name: name },
    }).then((res: AxiosResponse<Tag>) => {
        success(res.data)
    }).catch(() => {
        if (failure !== undefined) {
            failure()
        }
    })
}

export const getCategoryAPI = (name: string | null,
                               success: Function,
                               failure: Function) => {
    let url = '/category'
    if (name != null) {
        url += `?name=${name}`
    }
    myAxios.request({
        method: 'GET',
        url: url,
    }).then((res: AxiosResponse<Array<Tag>>) => {
        success(res.data)
    }).catch(() => {
        failure()
    })
}

export const modifyCategoryAPI = (data: Tag,
                                  success: Function,
                                  failure: Function) => {
    myAxios.request({
        method: 'PUT',
        url: '/category',
        data: data,
    }).then((res: AxiosResponse<Tag>) => {
        success(res.data)
    }).catch(() => {
        failure()
    })
}
