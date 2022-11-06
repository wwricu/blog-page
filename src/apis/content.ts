import myAxios from "@/apis/axios";

export const postContent = (data: any,
                            success: Function,
                            failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/content',
        data: data
    }).then((res: any) => {
        if (res.data.status === 'success') {
            success(res)
            return
        }
        failure(res)
    })
}

export const getAllBlog = (success: Function,
                           failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: '/content',
    }).then((res: any) => {
        if (res.data.status === 'success') {
            success(res)
            return
        }
        failure(res)
    })
}