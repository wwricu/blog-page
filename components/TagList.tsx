import {useEffect, useState} from "react";
import {GetAllTagsAPI} from "@/common/api";
import {TagTypeEnum, TagVO} from "@/common/model";


export default function TagList() {
    const [tagList, setTagList] = useState<TagVO[]>([])
    useEffect(() => {
        GetAllTagsAPI(TagTypeEnum.POST_CAT).then(res => {
            console.log(res)
            setTagList(res)
        })
    }, [])
    return (
        <>
            {tagList.map((tag: TagVO) => (
                <p key={tag.id}>{tag.name}</p>
            ))}
        </>
    )
}
