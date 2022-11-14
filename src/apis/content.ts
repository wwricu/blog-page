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
