import {AboutVO, PostPreviewPageVO, PostDetailVO, PostSearchVO, TagTypeEnum, TagVO} from "@/common/model"

const baseUrl = process.env.NEXT_BASE_URL ?? '/api'

const request = async <T>(url: string, init: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${baseUrl}${url}`, init)
    if (!res.ok) {
        const body = await res.json().catch(() => null) as {detail?: string} | null
        throw new Error(body?.detail ?? `${res.status} ${res.statusText} for ${url}`)
    }
    return await res.json() as T
}

const get = async <T>(url: string) => await request<T>(url)

const post = async <T>(url: string, body: unknown) => await request<T>(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
})

export const GetAllBlogPosts = async (
    pageIndex: number = 1,
    pageSize: number = 10,
    category: string | undefined = undefined,
    tag: string | undefined = undefined
) => {
    return await post<PostPreviewPageVO>('/open/post/all', {
        page_index: pageIndex,
        page_size: pageSize,
        category: category,
        tag_list: tag ? [tag] : undefined,
    })
}

export const SearchBlogPosts = async (keyword: string) => {
    const qs = new URLSearchParams({keyword}).toString()
    return await get<PostSearchVO[]>(`/open/post/search?${qs}`)
}

export const GetPostDetailAPI = async (postId: number | string) => {
    const postNumId = Number(postId as string)
    if (!Number.isSafeInteger(postNumId)) {
        return null
    }
    const url = `/open/post/detail/${postNumId}`
    // 404 means 'draft or gone', which this page renders as a soft not-found rather than an error,
    // so it needs the raw response instead of the throwing helper
    const res = await fetch(`${baseUrl}${url}`)
    if (res.status === 404) {
        return null
    }
    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText} for ${url}`)
    }
    return await res.json() as PostDetailVO
}

export const GetAllTagsAPI = async (tagTypeEnum: TagTypeEnum) => {
    return await get<TagVO[]>(`/open/tags/${tagTypeEnum}`)
}

export const GetAboutAPI = async () => {
    return await get<AboutVO>('/open/about')
}
