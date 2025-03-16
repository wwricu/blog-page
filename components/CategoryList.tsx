import {TagVO} from "@/common/model";
import {Flex, Typography} from "antd";
import Link from "next/link";

type CategoryListProps = {
    tags: TagVO[]
}

export default function CategoryList({tags}: CategoryListProps) {
    return <Flex className='w-full' justify='center'>
        <div className='mt-4 shadow-lg bg-[rgba(240,240,240,0.5)] rounded-md'>
            {tags.map((tag: TagVO) => (
                <Link key={tag.id} href={`/categories/${tag.name}`}>
                    <Flex justify='space-between' align='baseline' className='rounded-md py-3 px-5 w-md max-md:w-full hover:bg-slate-200 hover:shadow-md' >
                        <Typography.Text className='text-text-prime'>
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
