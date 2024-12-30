interface ModifyPostRO {
    id: number
    name: string | undefined | null
    classId: number | undefined | null
    tagIds: number[] | undefined | []
    content: string | undefined | null
    status: string | undefined | null
}

interface GetPostRO {
    pageSize: number
    pageNum: number
    classId: number | undefined | null
    tagIds: number[] | undefined | []
}
