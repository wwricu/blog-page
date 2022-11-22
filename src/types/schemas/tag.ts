export interface Tag {
    id?: number
    name?: string
}

export interface ContentTags {
    content_id?: number
    remove_tag_ids?: number[]
    add_tag_ids?: number[]
}

export interface TagContents {
    tag_id?: number
    remove_content_ids?: number[]
    add_content_ids?: number[]
}
