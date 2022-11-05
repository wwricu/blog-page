import myAxios from "@/global/axios";

export const getResource = (success: Function, failure: Function) => {
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

export const postResource = (data: any,
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

export const putResource = (data: any,
                            success: Function,
                            failure: Function) => {
    myAxios.request({
        method: 'PUT',
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
