import {PostPreviewVO} from '@/common/model'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"
import PostThumbnail from "@/components/PostThumbnail"

const markStyle = '[&_mark]:bg-primary/10 [&_mark]:text-primary [&_mark]:font-medium [&_mark]:rounded-sm [&_mark]:px-0.5'

export default function PostCard({ postDetailVO, index, className = '', snippet }: { postDetailVO: PostPreviewVO, index: number, className?: string, snippet?: string }) {
    const detailHref = `/detail/${postDetailVO.id}`

    return (
        <div className={
            `${className} group flex items-center justify-between gap-4 min-w-2xs w-full rounded-xl
            bg-base-100 ring-1 ring-base-300/70 px-4 py-5 transition-shadow hover:shadow-sm hover:ring-base-content/25
            max-sm:min-h-16 max-sm:px-3 max-md:w-full md:h-28 md:py-0 md:w-3xl`
        }>
            <div className='flex flex-col flex-1 items-start min-w-0'>
                <Link className='w-full' href={detailHref}>
                    <h4 className='text-base-content text-[17px] font-semibold tracking-tight leading-6 line-clamp-1 transition-colors group-hover:text-primary'>
                        {postDetailVO.title}
                    </h4>
                    {snippet ? (
                        <p className={`text-base-content/80 font-normal leading-6 text-sm line-clamp-1 max-sm:text-xs ${markStyle}`}
                           dangerouslySetInnerHTML={{__html: snippet}}/>
                    ) : (
                        <p className='text-base-content/70 font-normal leading-6 text-sm line-clamp-1 max-sm:text-xs'>{postDetailVO.preview}</p>
                    )}
                </Link>
                <div className='flex gap-x-3 gap-y-1 w-full flex-nowrap overflow-hidden'>
                    <PostCreateTime createTime={postDetailVO.create_time}/>
                    <PostCategory category={postDetailVO.category}/>
                    <PostTagList tagList={postDetailVO.tag_list}/>
                </div>
            </div>
            {postDetailVO.cover ? <PostThumbnail cover={postDetailVO.cover} title={postDetailVO.title} href={detailHref} index={index}/> : null}
        </div>
    )
}
