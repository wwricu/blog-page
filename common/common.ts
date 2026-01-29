export type AsyncPathParams = {
    params?: Promise<{
        id?: string
        filter?: string
        name?: string
        index?: string
    }>
}

const tagColorClassList = [
    // ' badge-primary',
    // ' badge-secondary',
    ' badge-accent',
    ' badge-info',
    ' badge-success',
    ' badge-warning',
    ' badge-error',
]
export const TagsUrl = 'tags'
export const CategoriesURL = 'categories'


export const getTagColorClass = () => {
    return tagColorClassList[Math.floor(Math.random() * tagColorClassList.length)]
}
