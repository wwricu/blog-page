import {PostDetailPageVO} from "@/pages/model";

const baseUrl = 'http://localhost:8000';

export const GetAllBlogPosts: (pageIndex?: number, pageSize?: number) => Promise<PostDetailPageVO> = async (
    pageIndex: number = 1,
    pageSize: number = 10,
    category_id: number | undefined = undefined,
    tag_id_list: number[] = []
) => {
    const res = await fetch(`${baseUrl}/open/post/all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            page_index: pageIndex,
            page_size: pageSize,
            category_id: category_id,
            tag_id_list: tag_id_list
        })
    })
    return await res.json() as PostDetailPageVO
}
