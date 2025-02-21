import {TagVO} from "@/common/model";
import {Flex, Row, Space, Typography} from "antd";
import Link from "next/link";

type CategoryListProps = {
    tags: TagVO[]
}

export default function CategoryList({tags}: CategoryListProps) {
    return <Flex className='w-full' justify='center'>
        <div className='mt-4 px-6 shadow-lg bg-white rounded-md'>
            {tags.map((tag: TagVO) => (
                <Link key={tag.id} href={`/categories/${tag.name}`}>
                    <Flex className='my-4 w-800px' justify='space-between'>
                        <Typography.Text className='text-lg'>
                            {tag.name}
                        </Typography.Text>
                        <Typography.Text type='secondary'>
                            {tag.count}
                        </Typography.Text>
                    </Flex>
                </Link>
            ))}
        </div>

    </Flex>
}
