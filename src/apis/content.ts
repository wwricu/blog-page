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

export const getAllBlog = (success: Function,
                           failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: '/content',
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
