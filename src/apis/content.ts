import myAxios from "@/apis/axios";
import type {ContentInput, ResourceSearch} from "@/types/schemas/resource";

export const postContent = (data: ContentInput,
                            success: Function,
                            failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/content',
        data: data
    }).then((res: any) => {
        success(res)
    })
}

export const getContent = (content_id: number | string | string[],
                           success: Function,
                           failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: `content/${content_id}`,
    }).then((res: any) => {
        success(res)
    })
}

export const getContentCountAPI = (data: ResourceSearch,
                                   success: Function,
                                   failure: Function) => {
    let url = '/content/count'
    if (data != null) {
        url += '?'
        if (data.url !== undefined) {
            url += `url=${data.url}&`
        }
        if (data.parent_id !== undefined) {
            url += `parent_id=${data.parent_id}&`
        }
        if (data.status !== undefined) {
            data.status = 'publish'
        }
        url += `status=${data.status}`
    }
    myAxios.request({
        method: 'GET',
        url: url,
    }).then((res: any) => {
        success(res)
    })
}

export const getContentPreview = (data: ResourceSearch,
                                  success: Function,
                                  failure: Function) => {
    let url = '/content/preview?'
    if (data != null) {
        if (data.status !== undefined) {
            url += `status=${data.status}&`
        }
        if (data.parent_id !== undefined) {
            url += `parent_id=${data.parent_id}&`
        }
        if (data.tag_id !== undefined) {
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

export const modifyContent = (data: ContentInput,
                              success: Function,
                              failure: Function) => {
    myAxios.request({
        method: 'PUT',
        url: '/content',
        data: data
    }).then((res: any) => {
        success(res)
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
