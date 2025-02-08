import {TagTypeEnum, TagVO} from "@/common/model";
import {Flex, Row, Typography} from "antd";
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
                            <div className='mx-2 my-1 min-w-24 text-slate-800 text-center w-20 border rounded-lg'>
                                <Typography.Link className='text-base'>
                                    {tag.name}
                                </Typography.Link>
                            </div>
                        </Link>
                    ))}
            </Flex>
        </Row>

    )
}
