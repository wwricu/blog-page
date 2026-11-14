import {SearchBlogPosts} from "@/common/api"
import Link from "next/link"
import SearchPostCard from "@/components/SearchPostCard"

export default async function SearchPostView({ keyword }: { keyword: string }) {
    const hits = await SearchBlogPosts(keyword)

    return (
        <div className={`
            flex flex-col items-center gap-3 w-full overflow-x-auto pb-2
            max-sm:px-1 max-sm:mt-3
            sm:mt-4 sm:px-2
            md:mt-5 md:px-0`
        }>
            <div className='flex items-center justify-between gap-3 min-w-2xs w-full max-sm:px-3 sm:px-4 max-md:w-full md:w-3xl'>
                <div className='breadcrumbs py-0 min-w-0 text-base-content/70 text-sm'>
                    <ul>
                        <li><Link className='hover:text-primary' href={'/'}>Home</Link></li>
                        <li>Search</li>
                        <li><span className='block max-w-48 truncate font-medium text-base-content'>{keyword}</span></li>
                    </ul>
                </div>
                {
                    hits.length > 0 ? (
                        <span className='shrink-0 text-xs text-base-content/50 tabular-nums'>
                            {hits.length} {hits.length === 1 ? 'result' : 'results'}
                        </span>
                    ) : null
                }
            </div>
            {
                hits.map((hit, i) =>
                    <SearchPostCard key={hit.id} index={i} hit={hit}/>
                )
            }
            {
                hits.length === 0 ? (
                    <div className='rounded-xl bg-base-100 ring-1 ring-base-300/70 px-6 py-14 text-center max-md:w-full md:w-3xl'>
                        <p className='text-sm font-medium text-base-content/80'>No matches for “{keyword}”.</p>
                        <p className='mt-1 text-xs text-base-content/55'>Try a different keyword.</p>
                    </div>
                ) : null
            }
            {
                hits.length >= 30 ? (
                    <p className='py-2 text-center text-xs text-base-content/50 max-md:w-full md:w-3xl'>
                        Showing the first 30 matches.
                    </p>
                ) : null
            }
        </div>
    )
}