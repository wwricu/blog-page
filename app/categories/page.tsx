import {TagTypeEnum, TagVO} from "@/common/model";
import {GetAllTagsAPI} from "@/common/api";
import CategoryList from "@/components/CategoryList";

export default async function category() {
    const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_CAT)
    return <CategoryList tags={tags}/>
}
