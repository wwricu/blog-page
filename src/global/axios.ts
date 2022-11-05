import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8443',
    timeout: 10000,
    withCredentials: true,
});

myAxios.interceptors.response.use(
    (res) => {
        if (res.data == null) {
            alert('no data returned')
        } else if (res.data.status !== 'success') {
            console.log(res)
            alert(res.data.message)
        }
        return res;
    },

    (error) => {
        let message = "";
        if (error && error.response) {
            switch (error.response.status) {
                case 302:
                    message = "redirected";
                    break;
                default:
                    message = "internal error";
                    break;
            }
        }
        return Promise.reject(message);
    }
);

export default myAxios;