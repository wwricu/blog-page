import myAxios from "@/apis/axios";
import type {FolderInput} from "@/types/schemas/resource";

export const getSubFolders = (success: Function, failure: Function) => {
    myAxios.request({
        method: 'GET',
        url: '/folder?parent_id=1',
    }).then((res: any) => {
        success(res)
    })
}

export const postFolder = (data: FolderInput,
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

export const putFolder = (data: FolderInput,
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

export const deleteFolder = (folder_id: number | string,
                             success: Function,
                             failure: Function) => {
    myAxios.request({
        method: 'DELETE',
        url: `/folder/${folder_id}`,
    }).then((res: any) => {
        success(res)
    })
}
