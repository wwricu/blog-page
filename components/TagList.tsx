import {TagTypeEnum, TagVO} from "@/common/model";
import {Card, Flex, Row} from "antd";
import Link from "next/link";

type TagListProps = {
    tags: TagVO[]
    type: TagTypeEnum
}

// TODO: 1. Add post count 2. Add description
export default function TagList({tags, type}: TagListProps) {
    const path = type === TagTypeEnum.POST_TAG ? '/?tag=' : '/?category=';
    return (
        <Row justify='center'>
            <Flex style={{width: 1000, marginTop: 10}}>
                    {tags.map((tag: TagVO) => (
                        <Link key={tag.id} href={path + tag.name}>
                            <Card
                                style={{width: 200, height: 150, margin: 10}}
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
