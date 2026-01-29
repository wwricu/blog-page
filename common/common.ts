export type PathParams = {
    id?: string
    filter?: string
    name?: string
    index?: string
}

export type AsyncPathParams = {
    params?: Promise<PathParams>
}

export const TagsUrl = 'tags'
export const CategoriesURL = 'categories'
