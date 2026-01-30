import {TagTypeEnum, TagVO} from "@/common/model"
import Link from "next/link"

export default function TagView({ tags, tagType}: {tags: TagVO[], tagType: TagTypeEnum}) {
    return (
        <div className='flex flex-col flex-1 w-full gap-6 pt-6 px-6 bg-base-100 shadow-sm max-md:w-full md:w-3xl'>
        {tags.map((tag: TagVO) => (
            <div key={tag.id} className='flex justify-between items-baseline'>
                <Link
                    className='link text-base-content/80 hover:text-primary'
                    href={`/${tagType === TagTypeEnum.POST_CAT ? 'categories' : 'tags'}/${tag.name}`}
                >
                    {tag.name}
                </Link>
                <p className='text-base-content/40'>
                    {tag.count}
                </p>
            </div>
        ))}
        </div>
    )
}
