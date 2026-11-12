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
    name: string | null
    key: string
    url: string
}

export interface PostPreviewVO {
    id: number
    title: string
    cover: PostResourceVO | null
    preview: string
    category: TagVO | null
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
    snippet: string | null
}

export interface SiteVO {
    title: string
    tagline: string
    content: string
    post_count: number
    category_count: number
    tag_count: number
}
