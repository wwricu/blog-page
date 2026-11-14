import {PostSearchVO} from '@/common/model'
import Link from 'next/link'
import {PostCategory, PostCreateTime, PostTagList} from "@/components/PostMeta"
import PostThumbnail from "@/components/PostThumbnail"

const markStyle = '[&_mark]:bg-primary/10 [&_mark]:text-primary [&_mark]:font-medium [&_mark]:rounded-sm [&_mark]:px-0.5'

export default function SearchPostCard({ hit, index }: { hit: PostSearchVO, index: number }) {
    const detailUrl = `/detail/${hit.id}`
    // imported content carries lone surrogates; they would render as replacement chars
    const snippet = hit.snippet?.replace(/\p{Surrogate}/gu, '')
    return (
        <div className={
            `group flex items-center justify-between gap-4 min-w-2xs w-full rounded-xl
            bg-base-100 ring-1 ring-base-300/70 px-4 py-5 transition-shadow hover:shadow-sm hover:ring-base-content/25
            max-sm:min-h-16 max-sm:px-3 max-md:w-full md:h-28 md:py-0 md:w-3xl`
        }>
            <div className='flex flex-col flex-1 items-start min-w-0'>
                <Link className='w-full' href={detailUrl}>
                    <h4 className='text-base-content text-[17px] font-semibold tracking-tight leading-6 line-clamp-1 transition-colors group-hover:text-primary'>{hit.title}</h4>
                    {snippet ? (
                        <p
                            className={`text-base-content/80 font-normal leading-6 text-sm line-clamp-1 max-sm:text-xs ${markStyle}`}
                            dangerouslySetInnerHTML={{__html: snippet}}
                        />
                    ) : (
                        <p className='text-base-content/70 font-normal leading-6 text-sm line-clamp-1 max-sm:text-xs'>
                            {hit.preview.replace(/\p{Surrogate}/gu, '')}
                        </p>
                    )}
                </Link>
                <div className='flex gap-x-3 gap-y-1 w-full flex-nowrap overflow-hidden'>
                    <PostCreateTime createTime={hit.create_time}/>
                    <PostCategory category={hit.category}/>
                    <PostTagList tagList={hit.tag_list}/>
                </div>
            </div>
            {hit.cover ? <PostThumbnail cover={hit.cover} title={hit.title} href={detailUrl} index={index}/> : null}
        </div>
    )
}