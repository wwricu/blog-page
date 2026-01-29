import TagList from "@/components/TagList";
import {TagTypeEnum, TagVO} from "@/common/model";
import {GetAllTagsAPI} from "@/common/api";

export default async function category() {
    const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_TAG)
    return <TagList tags={tags} tagType={TagTypeEnum.POST_TAG} />
}
