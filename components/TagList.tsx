import {TagTypeEnum, TagVO} from "@/common/model";
import {Flex, Row, Typography} from "antd";

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
                        <Typography.Link key={tag.id} href={path + tag.name}>
                            <div className='bg-white shadow-sm mx-2 my-1 min-w-24 text-lg text-center w-20 border rounded-lg'>
                                {tag.name}
                            </div>
                        </Typography.Link>
                    ))}
            </Flex>
        </Row>

    )
}
