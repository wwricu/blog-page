import TagList from "@/components/TagList";
import {TagTypeEnum, TagVO} from "@/common/model";
import {GetAllTagsAPI} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";


export const getServerSideProps = (async () => {
    const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_TAG)
    return { props: { tags } }
}) satisfies GetServerSideProps<{ tags: TagVO[] }>

export default function category({ tags }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <TagList tags={tags}/>
}
