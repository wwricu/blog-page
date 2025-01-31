import {PostDetailPageVO, PostDetailVO, TagTypeEnum, TagVO} from "@/common/model";

const baseUrl = process.env.BASE_URL

export const GetAllBlogPosts = async (
    pageIndex: number = 1,
    category: string | undefined = undefined,
    tag_list: string[] | undefined = undefined
) => {
    const res = await fetch(`${baseUrl}/open/post/all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            page_index: pageIndex,
            page_size: 10,
            category: category,
            tag_list: tag_list
        })
    })
    return await res.json() as PostDetailPageVO
}

export const GetPostDetailAPI = async (postId: number | string) => {
    const postNumId = parseInt(postId as string) // Fix user injection
    const res = await fetch(`${baseUrl}/open/post/detail/${postNumId}`, {method: 'GET'})
    return await res.json() as PostDetailVO
}

export const GetAllTagsAPI = async (tagTypeEnum: TagTypeEnum) => {
    const res = await fetch(`${baseUrl}/open/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: tagTypeEnum
        })
    })
    return await res.json() as TagVO[]
}
