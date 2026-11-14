import {SiteVO, PostPreviewPageVO, PostDetailVO, PostSearchVO, TagTypeEnum, TagVO} from "@/common/model"

const baseUrl = process.env.NEXT_BASE_URL ?? '/api'

const request = async <T>(url: string, init: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${baseUrl}${url}`, init)
    if (!res.ok) {
        const body = await res.json().catch(() => null) as {detail?: string | {msg?: string}[]} | null
        const detail = Array.isArray(body?.detail) ? body.detail.map(item => item.msg).join('; ') : body?.detail
        throw new Error(detail ?? `${res.status} ${res.statusText} for ${url}`)
    }
    return await res.json() as T
}

const post = async <T>(url: string, body: unknown) => await request<T>(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
})

export const GetAllBlogPosts = async (pageIndex = 1, pageSize = 10, category?: string, tag?: string) => {
    return await post<PostPreviewPageVO>('/open/post/all', {
        page_index: pageIndex,
        page_size: pageSize,
        category: category,
        tag_list: tag ? [tag] : undefined,
    })
}

export const SearchBlogPosts = async (keyword: string) => {
    const qs = new URLSearchParams({keyword}).toString()
    return await request<PostSearchVO[]>(`/open/post/search?${qs}`)
}

export const GetPostDetailAPI = async (postId: number | string) => {
    const postNumId = Number(postId as string)
    if (!Number.isSafeInteger(postNumId)) {
        return null
    }
    const url = `/open/post/detail/${postNumId}`
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
    return await request<TagVO[]>(`/open/tags/${tagTypeEnum}`)
}

export const GetSiteAPI = async () => {
    return await request<SiteVO>('/open/about', {next: {revalidate: 300}})
}
