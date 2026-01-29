import {AsyncPathParams} from "@/common/common"
import PostView from "@/components/PostView"

export default async function FilterPostPage({ params }: AsyncPathParams) {
    return PostView((await params) ?? {})
}
