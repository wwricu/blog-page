import {TagVO} from "@/common/model";
import {Flex, Row, Typography} from "antd";

type TagListProps = {
    tags: TagVO[]
}

export default function TagList({tags}: TagListProps) {
    return <Row justify='center'>
        <Flex className='mt-3 w-800px'>
                {tags.map((tag: TagVO) => (
                    <Flex key={tag.id} className='bg-white shadow-sm m-1 px-2 min-w-24 w-20 border rounded-lg' justify='space-between'>
                        <Typography.Link className='text-lg' href={`/tags/${tag.name}`}>
                            {tag.name}
                        </Typography.Link>
                        <Typography.Text type='secondary'>
                            {tag.count}
                        </Typography.Text>
                    </Flex>
                ))}
        </Flex>
    </Row>
}
