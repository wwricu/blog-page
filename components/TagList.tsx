import {TagVO} from "@/common/model";
import {Flex, Row, Typography} from "antd";
import Link from "next/link";

type TagListProps = {
    tags: TagVO[]
}

export default function TagList({tags}: TagListProps) {
    return <Row justify='center'>
        <Flex className='mt-3 w-800px'>
                {tags.map((tag: TagVO) => (
                    <Link key={tag.id} href={`/tags/${tag.name}`}>
                        <Flex
                            justify='space-between'
                            align='baseline'
                            className='bg-white shadow-sm m-1 px-2 min-w-24 w-20 border rounded-lg hover:shadow-md hover:bg-slate-100'
                        >
                            <Typography.Text className='text-lg'>
                                {tag.name}
                            </Typography.Text>
                            <Typography.Text type='secondary'>
                                {tag.count}
                            </Typography.Text>
                        </Flex>
                    </Link>
                ))}
        </Flex>
    </Row>
}
