import {TagTypeEnum, TagVO} from "@/common/model"
import Link from "next/link"

export default function TagView({ tags, tagType}: {tags: TagVO[], tagType: TagTypeEnum}) {
    return (
        <div className='flex flex-col flex-1 w-full gap-6 pt-6 px-6 bg-[rgba(240,240,240,0.5)] shadow-xs border-x border-gray-200 max-md:w-full md:w-3xl'>
        {tags.map((tag: TagVO) => (
            <div key={tag.id} className='flex justify-between items-baseline'>
                <Link
                    className='link text-gray-800 hover:text-cyan-600'
                    href={`/${tagType === TagTypeEnum.POST_CAT ? 'categories' : 'tags'}/${tag.name}`}
                >
                    {tag.name}
                </Link>
                <p className='text-gray-600'>
                    {tag.count}
                </p>
            </div>
        ))}
        </div>
    )
}
