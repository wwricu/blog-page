import {TagTypeEnum, TagVO} from "@/common/model";
import {GetAllTagsAPI} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import CategoryList from "@/components/CategoryList";


export const getServerSideProps = (async () => {
    const tags: TagVO[] = await GetAllTagsAPI(TagTypeEnum.POST_CAT)
    return { props: { tags } }
}) satisfies GetServerSideProps<{ tags: TagVO[] }>

export default function category({ tags }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <CategoryList tags={tags}/>
}
