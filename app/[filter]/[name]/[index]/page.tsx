import PostView from "@/components/PostList"
import {AsyncPathParams} from "@/common/common"

export default async function PostPage({ params }: AsyncPathParams) {
    return PostView((await params) ?? {})
}
