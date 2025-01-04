enum PostResourceTypeEnum {
    IMAGE = 'image',
    COVER_IMAGE = 'cover',
    COMMON = 'common'
}

enum TagTypeEnum {
    POST_TAG = 'post_tag',
    POST_CAT = 'post_category'
}

interface PostRequestRO {
    page_index: number
    page_size: number
    tag_list?: number[]
    cat_id?: number
}

interface TagRequestRO {
    page_index: number
    page_size: number
    type: TagTypeEnum
}

interface TagVO {
    id: number
    name: string
    type: string
}

interface PostResourceVO {
    id: number
    name: string
    key: string
    url: string
    type: PostResourceTypeEnum
}

interface PostDetailVO {
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
