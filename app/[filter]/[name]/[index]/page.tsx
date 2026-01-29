import PostView from "@/components/PostView"
import {AsyncPathParams} from "@/common/common"

export default async function PostPage({ params }: AsyncPathParams) {
    return PostView((await params) ?? {})
}
