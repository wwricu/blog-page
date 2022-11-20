import myAxios from "@/apis/axios";

export const addTagAPI = (name: String,
                         success: Function,
                         failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/tag',
        data: {
            name: name
        }
    }).then((res: any) => {
        success(res)
    })
}
