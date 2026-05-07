import {AboutVO, PostDetailPageVO, PostDetailVO, TagTypeEnum, TagVO} from "@/common/model"

const baseUrl = process.env.NEXT_BASE_URL ?? '/api'

const getForwardedHeaders = async (): Promise<Record<string, string>> => {
    if (typeof window !== 'undefined') {
        return {}
    }
    const {headers} = await import('next/headers')
    const h = await headers()
    return {
        'X-Real-IP': h.get('X-Real-IP') || '',
        'X-Forwarded-For': h.get('X-Forwarded-For') || ''
    }
}

export const GetAllBlogPosts = async (
    pageIndex: number = 1,
    pageSize: number = 10,
    category: string | undefined = undefined,
    tag: string | undefined = undefined
) => {
    const res = await fetch(`${baseUrl}/open/post/all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(await getForwardedHeaders()),
        },
        body: JSON.stringify({
            page_index: pageIndex,
            page_size: pageSize,
            category: category,
            tag_list: tag ? [tag] : undefined,
        })
    })
    return await res.json() as PostDetailPageVO
}

export const GetPostDetailAPI = async (postId: number | string) => {
    const postNumId = Number(postId as string)
    if (!Number.isSafeInteger(postNumId)) {
        return null
    }
    const res = await fetch(`${baseUrl}/open/post/detail/${postNumId}`, {
        headers: await getForwardedHeaders(),
    })
    if (!res.ok && res.status === 404) {
        return null
    }
    return await res.json() as PostDetailVO
}

export const GetAllTagsAPI = async (tagTypeEnum: TagTypeEnum) => {
    const res = await fetch(`${baseUrl}/open/tags/${tagTypeEnum}`, {
        headers: await getForwardedHeaders(),
    })
    return await res.json() as TagVO[]
}

export const GetAboutAPI = async () => {
    const res = await fetch(`${baseUrl}/open/about`, {
        headers: await getForwardedHeaders(),
    })
    return await res.json() as AboutVO
}
