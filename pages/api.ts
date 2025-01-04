// import axios, {AxiosResponse} from "axios";
//
// axios.defaults.baseURL = 'http://localhost:8080/'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Accept'] = 'application/json'
// axios.defaults.withCredentials = true
//
//
// export const getAllPosts = async (postRequestRO: PostRequestRO) => {
//     return axios.post('/post/all', postRequestRO).then((res: AxiosResponse<PostDetailVO[]>) => res.data)
// }
//
// export const getPostDetail = async (postId: number) => {
//     return axios.get(`/post/detail/${postId}`).then((res: AxiosResponse<PostDetailVO>) => res.data)
// }
//
// export const getAllTags = (getTag: TagRequestRO) => {
//     return axios.post('/tags', getTag).then((res: AxiosResponse<TagVO>) => res.data)
// }
