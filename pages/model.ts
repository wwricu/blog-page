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
    tag_list?: number[]
    cat_id?: number
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
    post_details: PostDetailVO[]
}
