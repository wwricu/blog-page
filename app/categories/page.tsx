import {TagTypeEnum, TagVO} from "@/common/model";
import {GetAllTagsAPI} from "@/common/api";
import TagList from "@/components/TagList";

export default async function category() {
    const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_CAT)
    return <TagList tags={tags}/>
}
