import {SearchBlogPosts} from "@/common/api"
import {SearchUrl} from "@/common/common"
import Link from "next/link"
import SearchPostCard from "@/components/SearchPostCard"

export default async function SearchPostView({ keyword }: { keyword: string }) {
    const hits = await SearchBlogPosts(keyword)

    return (
        <div className={`
            flex flex-col items-center gap-3 w-full overflow-x-auto
            max-sm:px-1 max-sm:mt-1
            sm:mt-2 sm:px-2
            md:mt-3 md:p-0`
        }>
            <div className='breadcrumbs py-0 min-w-2xs text-base-content/70 text-sm w-full max-sm:pl-3 sm:pl-4 max-md:w-full md:w-3xl'>
                <ul>
                    <li><Link className='hover:text-primary' href={'/'}>Home</Link></li>
                    <li>{SearchUrl}</li>
                    <li>{keyword}</li>
                </ul>
            </div>
            {
                hits.map((hit, i) =>
                    <SearchPostCard key={hit.id} index={i} hit={hit}/>
                )
            }
            {
                hits.length === 0 ? (
                    <div className='rounded-xl bg-base-100 ring-1 ring-base-300 text-base-content/70 text-sm py-8 text-center max-md:w-full md:w-3xl'>
                        No matching posts. Try different keywords.
                    </div>
                ) : null
            }
            {
                hits.length >= 30 ? (
                    <div className='text-base-content/50 text-xs text-center py-4 mb-4 max-md:w-full md:w-3xl'>
                        Showing up to 30 results · refine your keyword for fewer matches
                    </div>
                ) : null
            }
        </div>
    )
}
