import type {Tag} from "@/types/schemas/tag";

interface ResourceBase {
    id?: number
    title?: string
    parent_id?: number | string
}

export interface ResourceSearch extends ResourceBase {
    status?: string
    tag_id?: number | string
    pageIdx?: number
    pageSize?: number
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

export interface ContentPreview extends FolderOutput {
    parent?: FolderOutput
    author_id?: number
    sub_title?: string
    status?: string
    tags?: Tag[]
}

export interface ContentOutput extends ContentPreview {
    content?: string
}