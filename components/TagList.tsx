import {TagTypeEnum, TagVO} from "@/common/model";
import {Card, Flex, Row} from "antd";
import Link from "next/link";

type TagListProps = {
    tags: TagVO[]
    type: TagTypeEnum
}

// TODO: 1. Add post count 2. Add description
export default function TagList({tags, type}: TagListProps) {
    const path = type === TagTypeEnum.POST_TAG ? '/tags/' : '/categories/';
    return (
        <Row justify='center'>
            <Flex className='mt-3 w-800px'>
                    {tags.map((tag: TagVO) => (
                        <Link key={tag.id} href={path + tag.name}>
                            <Card
                                className='w-52 h-36 m-2'
                                key={tag.id}
                                title={tag.name}
                            >No description
                            </Card>
                        </Link>
                    ))}
            </Flex>
        </Row>

    )
}
