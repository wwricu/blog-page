import {TagVO} from "@/common/model";
import Link from "next/link";

type TagListProps = {
    tags: TagVO[]
}

export default function TagList({tags}: TagListProps) {
    return (
        <div className="flex flex-wrap justify-center">
            <div className='flex mt-3 w-3xl flex-wrap'>
                {tags.map((tag: TagVO) => (
                    <Link key={tag.id} href={`/tags/${tag.name}`}>
                        <div className='badge badge-sm badge-neutral badge-outline text-sm text-text-prime shadow-sm m-1 px-2 min-w-12.5 max-w-[100vw] border-gray-200 rounded-lg hover:shadow-md hover:bg-slate-100'>
                            <div className='justify-between items-baseline gap-2'>
                                <span className='overflow-hidden'>
                                    {tag.name}
                                </span>
                                <span>
                                    {tag.count}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
