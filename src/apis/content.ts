import myAxios from "@/apis/axios";

export const postContent = (data: any,
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

export const getContent = (data: any,
                           success: Function,
                           failure: Function) => {
    let url = '/content'
    if (data != null) {
        url += '?'
        if (data.id !== undefined) {
            url += `content_id=${data.id}&`
        }
        if (data.url !== undefined) {
            url += `url=${data.url}&`
        }
        if (data.status !== undefined) {
            url += `status=${data.status}&`
        }
        if (data.parent_id !== undefined) {
            url += `parent_id=${data.parent_id}&`
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

export const getContentCountAPI = (data: any,
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

export const getContentPreview = (data: any,
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

export const getAllBlog = (success: Function,
                           failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: '/content',
    }).then((res: any) => {
        success(res)
    })
}

export const modifyContent = (data: any,
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

export const deleteContent = (data: any,
                              success: Function,
                              failure: Function) => {
    myAxios.request({
        method: 'DELETE',
        url: `/content/${data.id}`,
    }).then((res: any) => {
        success(res)
    })
}
