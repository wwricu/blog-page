import {AsyncPathParams} from "@/common/common"
import PostView from "@/components/PostList"

export default async function FilterPostPage({ params }: AsyncPathParams) {
    return PostView((await params) ?? {})
}
