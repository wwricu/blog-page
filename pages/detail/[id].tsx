import {PostDetailVO} from "@/common/model";
import {GetPostDetailAPI} from "@/common/api";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Flex} from "antd";


export const getServerSideProps = (async (context) => {
    const { params } = context;
    const postId = params!.id;
    const postDetailVO = await GetPostDetailAPI(postId as string)
    return { props: { postDetailVO } }
}) satisfies GetServerSideProps<{ postDetailVO: PostDetailVO }>


export default function PostDetailPage({ postDetailVO }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Flex
            justify='center'
            style={{
            backgroundImage: 'url("https://www.toptal.com/designers/subtlepatterns/uploads/leaves.png")',
            height: '100vh',
            width: '100%',
        }}>
            <div style={{width: '600px'}}>
                <div>
                    <p>{postDetailVO.title}</p>
                </div>
                <div dangerouslySetInnerHTML={{__html: postDetailVO.content}} ></div>
            </div>
        </Flex>
    )
}
