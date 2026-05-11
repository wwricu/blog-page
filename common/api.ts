import {AboutVO, PostDetailPageVO, PostDetailVO, TagTypeEnum, TagVO} from "@/common/model"

const baseUrl = process.env.NEXT_BASE_URL ?? '/api'


const getForwardedHeaders = async (): Promise<Record<string, string>> => {
    if (typeof window !== 'undefined') {
        return {}
    }
    const {headers} = await import('next/headers')
    const forwarded = (await headers()).get('X-Forwarded-For')
    return forwarded ? {'X-Forwarded-For': forwarded} : {}
}

const get = async<T> (url: string) => {
    const res = await fetch(`${baseUrl}${url}`, {headers: await getForwardedHeaders()})
    return await res.json() as T
}

const post = async<T> (url: string, body: any) => {
    const res = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', ...await getForwardedHeaders()},
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
    return await get<PostDetailVO>(`/open/post/detail/${postNumId}`)
}

export const GetAllTagsAPI = async (tagTypeEnum: TagTypeEnum) => {
    return await get<TagVO[]>(`/open/tags/${tagTypeEnum}`)
}

export const GetAboutAPI = async () => {
    return await get<AboutVO>(`/open/about`)
}
