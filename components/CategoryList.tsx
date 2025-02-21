import {TagVO} from "@/common/model";
import {Flex, Row, Typography} from "antd";
import Link from "next/link";

type CategoryListProps = {
    tags: TagVO[]
}

export default function CategoryList({tags}: CategoryListProps) {
    return <>
        {tags.map((tag: TagVO) => (
            <Row key={tag.id} justify='center'>
                <Link  href={`/categories/${tag.name}`}>
                    <Flex className='mt-6 w-800px' justify='space-between'>
                        <Typography.Text className='text-lg'>
                            {tag.name}
                        </Typography.Text>
                        <Typography.Text type='secondary'>
                            {tag.count}
                        </Typography.Text>
                    </Flex>
                </Link>
            </Row>
        ))}
    </>
}
