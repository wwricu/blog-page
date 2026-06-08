export enum TagTypeEnum {
    POST_TAG = 'post_tag',
    POST_CAT = 'post_category'
}

export interface TagVO {
    id: number
    name: string
    type: string
    count: number
}

export interface PostResourceVO {
    id: number
    name: string
    key: string
    url: string
}

export interface PostPreviewVO {
    id: number
    title: string
    cover?: PostResourceVO
    preview: string
    category?: TagVO
    tag_list: TagVO[]
    create_time: string
    update_time: string
}

export interface PostDetailVO extends PostPreviewVO {
    content: string
}

export interface PostPreviewPageVO {
    page_index: number
    page_size: number
    count: number
    data: PostPreviewVO[]
}

export interface PostSearchVO extends PostPreviewVO {
    snippet?: string
}

export interface AboutVO {
    content: string
    post_count: number
    category_count: number
    tag_count: number
}
