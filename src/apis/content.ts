import myAxios from "@/apis/axios";
import type {ContentInput, ContentOutput, ResourceSearch} from "@/types/schemas/resource";
import type {AxiosResponse} from "axios";

export const postContentAPI = (data: ContentInput,
                               success: Function,
                               failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/content',
        data: data
    }).then((res: AxiosResponse<number>) => {
        success(res.data)
    })
}

export const getContentAPI = (content_id: number | string | string[],
                              success: Function,
                              failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: `content?content_id=${content_id}`,
    }).then((res: AxiosResponse<ContentOutput>) => {
        success(res.data)
    })
}

export const getContentCountAPI = (data: ResourceSearch,
                                   success: Function,
                                   failure: Function) => {
    let url = '/folder/count/'
    if (data != null) {
        if (data.parent_url != null && data.parent_url.length > 0) {
            url += `${data.parent_url}`
        }
        if (data.tag_id != null && data.tag_id != 0) {
            url += `?tag_id=${data.tag_id}`
        }
    }
    myAxios.request({
        method: 'GET',
        url: url,
    }).then((res: AxiosResponse<number>) => {
        success(res.data)
    })
}

export const getContentPreview = (data: ResourceSearch,
                                  success: Function,
                                  failure: Function) => {
    let url = '/folder/sub_resources/'
    if (data != null) {
        if (data.parent_url !== undefined && data.parent_url.length > 0) {
            url += `${data.parent_url}`
        }
        url += '?'
        if (data.tag_id !== undefined && data.tag_id != 0) {
            url += `tag_id=${data.tag_id}&`
        }
        if (data.pageIdx !== undefined) {
            url += `page_idx=${data.pageIdx}&`
        }
        if (data.pageSize !== undefined) {
            url += `page_size=${data.pageSize}&`
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

export const modifyContentAPI = (data: ContentInput,
                                 success: Function,
                                 failure: Function) => {
    myAxios.request({
        method: 'PUT',
        url: '/content',
        data: data
    }).then((res: AxiosResponse<ContentOutput>) => {
        success(res.data)
    })
}

export const deleteContent = (content_id: number | string | string[],
                              success: Function,
                              failure: Function) => {
    myAxios.request({
        method: 'DELETE',
        url: `/content/${content_id}`,
    }).then((res: any) => {
        success(res)
    })
}
