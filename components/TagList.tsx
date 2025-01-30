import {TagVO} from "@/common/model";

type TagListProps = {
    tags: TagVO[]
}

export default function TagList({tags}: TagListProps) {
    return (
        <>
            {tags.map((tag: TagVO) => (
                <p key={tag.id}>{tag.name}</p>
            ))}
        </>
    )
}
