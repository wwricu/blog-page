import myAxios from "@/global/axios";

export const getCategories = (success: Function, failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: '/resource/subResources?url=',
    }).then((res: any) => {
        if (res.data.status === 'success') {
            success(res)
            return
        }
        failure(res)
    })
}

export const submitBlog = (data: any,
                           success: Function,
                           failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/resource',
        data: data
    }).then((res: any) => {
        if (res.data.status === 'success') {
            success(res)
            return
        }
        failure(res)
    })
}
