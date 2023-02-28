import myAxios from "@/apis/axios";
import type {ContentInput, ContentOutput, ResourcePreview, ResourceSearch} from "@/types/schemas/resource";
import type {AxiosResponse, AxiosError} from "axios";
import {usePreviewStore} from "@/stores/preview";
import {useContentStore} from "@/stores/content";


const previewStore = usePreviewStore()
const contentStore = useContentStore()

export const postContentAPI = (data: ContentInput,
                               success: Function,
                               failure: Function = ()=>{}) => {
    myAxios.request({
        method: 'POST',
        url: '/content',
        data: data
    }).then((res: AxiosResponse<number>) => {
        success(res.data)
        previewStore.clear()
    }).catch((err: AxiosError) => {
        failure(err)
    })
}

export const getContentAPI = (content_id: number | string | string[],
                              success: Function,
                              failure: Function = ()=>{}) => {
    const content: ContentOutput | undefined = contentStore.get(content_id)
    if (content !== undefined) {
        success(content)
        return
    }
    myAxios.request({
        method: 'GET',
        url: `content/${content_id}`,
    }).then((res: AxiosResponse<ContentOutput>) => {
        contentStore.set(res.data.id, res.data)
        success(res.data)
    }).catch((err: AxiosError) => {
        failure(err)
    })
}

export const getContentCountAPI = (data: ResourceSearch,
                                   success: Function,
                                   failure: Function = ()=>{}) => {
    const count: number | undefined = previewStore.getCount(
        data.parent_url,
        data.category_name,
        data.tag_name,
    )
    if (count !== undefined) {
        success(count)
        return
    }

    let url = '/folder/count/'
    if (data.parent_url != null && data.parent_url.length > 0) {
        if (data.parent_url[0] === '/') {
            data.parent_url = data.parent_url.substring(1)
        }
        url += `${data.parent_url}`
    }
    if (data.category_name != null && data.category_name.length != 0) {
        url += `?category_name=${data.category_name}`
    }
    if (data.tag_name != null && data.tag_name.length != 0) {
        url += `?tag_name=${data.tag_name}`
    }
    myAxios.request({
        method: 'GET',
        url: url,
    }).then((res: AxiosResponse<number>) => {
        success(res.data)
        previewStore.setCount(
            res.data,
            data.parent_url,
            data.category_name,
            data.tag_name
        )
    }).catch((err: AxiosError) => {
        failure(err)
    })
}

export const getContentPreviewAPI = (data: ResourceSearch,
                                     success: Function,
                                     failure: Function = ()=>{}) => {
    const previews: ResourcePreview[] | undefined = previewStore.getPreview(
        data.parent_url,
        data.category_name,
        data.tag_name,
        data.pageIdx
    )
    if (previews !== undefined) {
        success(previews)
        return
    }

    let url = '/folder/sub_content/'
    if (data.parent_url !== undefined && data.parent_url.length > 0) {
        if (data.parent_url[0] === '/') {
            data.parent_url = data.parent_url.substring(1)
        }
        url += `${data.parent_url}`
    }
    url += '?'
    if (data.tag_name !== undefined && data.tag_name.length != 0) {
        url += `tag_name=${data.tag_name}&`
    }
    if (data.category_name !== undefined && data.category_name.length != 0) {
        url += `category_name=${data.category_name}&`
    }
    if (data.pageIdx !== undefined) {
        url += `page_idx=${data.pageIdx}&`
    }
    if (data.pageSize !== undefined) {
        url += `page_size=${data.pageSize}&`
    }
    url = url.slice(0, -1)

    myAxios.request({
        method: 'GET',
        url: url,
    }).then((res: AxiosResponse<ResourcePreview[]>) => {
        success(res.data)
        previewStore.setPreview(
            res.data,
            data.parent_url,
            data.category_name,
            data.tag_name,
            data.pageIdx
        )
    }).catch((err: AxiosError) => {
        failure(err)
    })
}

export const modifyContentAPI = (data: ContentInput,
                                 success: Function,
                                 failure: Function = ()=>{}) => {
    myAxios.request({
        method: 'PUT',
        url: '/content',
        data: data
    }).then((res: AxiosResponse<ContentOutput>) => {
        success(res.data)
        previewStore.clear()
        contentStore.clear()
    }).catch((err: AxiosError) => {
        failure(err)
    })
}

export const deleteContentAPI = (content_id: number | string | string[] | undefined,
                                 success: Function,
                                 failure: Function = ()=>{}) => {
    myAxios.request({
        method: 'DELETE',
        url: `/content/${content_id}`,
    }).then((res: AxiosResponse<number>) => {
        success(res.data)
        previewStore.clear()
        contentStore.clear()
    }).catch((err: AxiosError) => {
        failure(err)
    })
}
