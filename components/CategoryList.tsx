import {TagVO} from "@/common/model";
import Link from "next/link";

type CategoryListProps = {
    tags: TagVO[]
}

export default function CategoryList({tags}: CategoryListProps) {
    return (
        <div className='flex justify-center w-full'>
            <div className='mt-4 shadow-lg bg-[rgba(240,240,240,0.5)] rounded-md'>
                {tags.map((tag: TagVO) => (
                    <Link key={tag.id} href={`/categories/${tag.name}`}>
                        <div className='flex justify-between items-baseline rounded-md py-3 px-5 w-3xl max-md:w-full hover:bg-slate-200 hover:shadow-md' >
                            <p className='text-text-prime'>
                                {tag.name}
                            </p>
                            <p className='text-gray-500'>
                                {tag.count}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
