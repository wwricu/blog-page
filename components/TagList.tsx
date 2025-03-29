import {TagVO} from "@/common/model";
import {Flex, Row, Tag} from "antd";
import Link from "next/link";

type TagListProps = {
    tags: TagVO[]
}

export default function TagList({tags}: TagListProps) {
    return (
        <Row justify='center'>
            <Flex className='mt-3 w-md flex-wrap'>
                {tags.map((tag: TagVO) => (
                    <Link key={tag.id} href={`/tags/${tag.name}`}>
                        <Tag
                            className='bg-[rgba(255,255,255,0.3)] text-sm text-text-prime shadow-sm m-1 px-2 min-w-[50px] max-w-[100vw] border rounded-lg hover:shadow-md hover:bg-slate-100'
                        >
                            <Flex justify='space-between' gap='small' align='baseline'>
                                <span className='overflow-hidden'>
                                    {tag.name}
                                </span>
                                <span>
                                    {tag.count}
                                </span>
                            </Flex>
                        </Tag>
                    </Link>
                ))}
            </Flex>
        </Row>
    )
}
