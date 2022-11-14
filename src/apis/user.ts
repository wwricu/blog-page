import myAxios from "@/apis/axios";

export const loginApi = (data: any,
                      success: Function,
                      failure: Function) => {
    myAxios.request({
        method: 'POST',
        url: '/auth',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: data
    }).then((res: any) => {
        success(res)
    })
}
