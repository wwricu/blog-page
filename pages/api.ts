import {PostDetailPageVO} from "@/pages/model";

const baseUrl = 'http://localhost:8000';

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
