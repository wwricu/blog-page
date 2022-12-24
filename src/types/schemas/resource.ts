import type {Tag} from "@/types/schemas/tag";

interface ResourceBase {
    id?: number
    title?: string
    parent_id?: number | string
    parent_url?: string
    permission?: number
}

export interface ResourceSearch extends ResourceBase {
    status?: string
    tag_id?: number | string
    pageIdx?: number
    pageSize?: number
    parent_url?: string
    category_name?: string
    tag_name?: string
}

export interface FolderInput extends ResourceBase {

}

export interface ContentInput extends ResourceBase {
    sub_title?: string
    status?: string
    content?: string
}

export interface FolderOutput extends ResourceBase {
    url?: string
    created_time?: string
    updated_time?: string
}

export interface ResourcePreview extends FolderOutput {
    parent?: FolderOutput
    owner_id?: number
    type?: string
    tags?: Tag[]
}

export interface ContentOutput extends ResourcePreview {
    content?: string
}
