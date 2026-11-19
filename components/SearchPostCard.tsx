import {PostSearchVO} from '@/common/model'
import PostCard from "@/components/PostCard"

// imported content carries lone surrogates; they would render as replacement chars
const stripSurrogates = (text: string) => text.replace(/\p{Surrogate}/gu, '')

export default function SearchPostCard({ hit, index }: { hit: PostSearchVO, index: number }) {
    return <PostCard postDetailVO={{...hit, preview: stripSurrogates(hit.preview)}} index={index}
                     snippet={hit.snippet ? stripSurrogates(hit.snippet) : undefined}/>
}
