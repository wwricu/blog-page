import myAxios from "@/apis/axios";
import type {FolderInput, ResourcePreview} from "@/types/schemas/resource";
import type {AxiosResponse} from "axios";

export const getSubFolders = (url: string,
                              success: Function,
                              failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: `/folder/sub_resources/${url}`,
    }).then((res: AxiosResponse<ResourcePreview>) => {
        success(res.data)
    })
}

export const postFolderAPI = (data: FolderInput,
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

export const putFolderAPI = (data: FolderInput,
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

export const deleteFolderAPI = (folder_id: number | string,
                                success: Function,
                                failure: Function) => {
    myAxios.request({
        method: 'DELETE',
        url: `/folder/${folder_id}`,
    }).then((res: any) => {
        success(res)
    })
}
