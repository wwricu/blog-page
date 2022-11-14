import myAxios from "@/apis/axios";

export const getSubFolders = (success: Function, failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: '/folder?parent_id=1',
    }).then((res: any) => {
        success(res)
    })
}

export const postFolder = (data: any,
                        success: Function,
                        failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/folder',
        data: data
    }).then((res: any) => {
        success(res)
    })
}

export const putFolder = (data: any,
                            success: Function,
                            failure: Function) => {
    myAxios.request({
        method: 'PUT',
        url: '/folder',
        data: data
    }).then((res: any) => {
        success(res)
        // failure(res)
    })
}

export const deleteFolder = (data: any,
                          success: Function,
                          failure: Function) => {
    myAxios.request({
        method: 'DELETE',
        url: `/folder/${data.id}`,
    }).then((res: any) => {
        success(res)
    })
}
