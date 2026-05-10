import {AboutVO, PostDetailPageVO, PostDetailVO, TagTypeEnum, TagVO} from "@/common/model"

const baseUrl = process.env.NEXT_BASE_URL ?? '/api'

const api_key_headers = {
    'x-api-key-id': process.env.NEXT_API_KEY_ID || '',
    'x-api-key': process.env.NEXT_API_KEY || '',
}

const get = async<T> (url: string) => {
    const res = await fetch(`${baseUrl}${url}`, {headers: api_key_headers})
    return await res.json() as T
}

const post = async<T> (url: string, body: any) => {
    const res = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', ...api_key_headers},
        body: JSON.stringify(body)
    })
    return await res.json() as T
}

export const GetAllBlogPosts = async (
    pageIndex: number = 1,
    pageSize: number = 10,
    category: string | undefined = undefined,
    tag: string | undefined = undefined
) => {
    return await post<PostDetailPageVO>('/open/post/all', {
            page_index: pageIndex,
            page_size: pageSize,
            category: category,
            tag_list: tag ? [tag] : undefined,
    })
}

export const GetPostDetailAPI = async (postId: number | string) => {
    const postNumId = Number(postId as string)
    if (!Number.isSafeInteger(postNumId)) {
        return null
    }
    return await get<PostDetailVO>(`${baseUrl}/open/post/detail/${postNumId}`)
}

export const GetAllTagsAPI = async (tagTypeEnum: TagTypeEnum) => {
    return await get<TagVO[]>(`/open/tags/${tagTypeEnum}`)
}

export const GetAboutAPI = async () => {
    return await get<AboutVO>(`/open/about`)
}
