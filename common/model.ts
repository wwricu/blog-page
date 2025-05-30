export enum PostResourceTypeEnum {
    IMAGE = 'image',
    COVER_IMAGE = 'cover',
    COMMON = 'common'
}

export enum TagTypeEnum {
    POST_TAG = 'post_tag',
    POST_CAT = 'post_category'
}

export interface PostRequestRO {
    page_index: number
    page_size: number
    tag_list?: string[]
    cat_id?: string
}

export interface TagRequestRO {
    page_index: number
    page_size: number
    type: TagTypeEnum
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
    type: PostResourceTypeEnum
}

export interface PostDetailVO {
    id: number
    title: string
    cover?: PostResourceVO
    content: string
    preview: string
    category?: TagVO
    tag_list: TagVO[]
    create_time: string
    update_time: string
}

export interface PostDetailPageVO {
    page_index: number
    page_size: number
    count: number
    data: PostDetailVO[]
}

export interface AboutVO {
    content: string
    post_count: number
    category_count: number
    tag_count: number
}
