import React, {useEffect, useState} from 'react';
import {
    AppstoreOutlined,
    GithubOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    MailOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {Button, Divider, Flex, Menu, Modal, Statistic} from 'antd';
import Link from "next/link";
import {GetAboutAPI} from "@/common/api";


const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)

    const statisticClassName = 'text-sm text-center'

    useEffect(() => {
        GetAboutAPI().then((res) => {
            setAbout(res.content)
            setPostCount(res.post_count)
            setCategoryCount(res.category_count)
            setTagCount(res.tag_count)
        })
    }, []);

    return <>
        <Menu className='leading-10 block' mode="horizontal">
            <Menu.Item key="home" icon={(<HomeOutlined/>)}>
                <Link href="/" rel="noopener noreferrer">Home</Link>
            </Menu.Item>
            <Menu.Item key="categories" icon={(<AppstoreOutlined/>)}>
                <Link href="/categories" rel="noopener noreferrer">Category</Link>
            </Menu.Item>
            <Menu.Item key="tags" icon={(<TagsOutlined/>)}>
                <Link href="/tags" rel="noopener noreferrer">Tags</Link>
            </Menu.Item>
            <Menu.Item className='float-right' key="about" icon={(<InfoCircleOutlined/>)} onClick={() => setIsModalOpen(true)}>
                About
            </Menu.Item>
        </Menu>
        <Modal
            footer={null}
            closable={false}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => setIsModalOpen(false)}
        >
            <div dangerouslySetInnerHTML={{__html: about}} className='min-h-48'/>
            <Divider className='my-4'/>
            <Flex justify='space-between'>
            <Button type='primary' href='https://github.com/wwricu' target='_blank' className='m-2 grow'><GithubOutlined/>GitHub</Button>
            <Button href='mailto:me@wwr.icu' className='m-2 grow'><MailOutlined/>Mail me</Button>
            </Flex>
            <Divider className='my-4'/>
            <Flex justify='space-around'>
                <Statistic title="Post" value={postCount} className={statisticClassName}/>
                <Statistic title="Category" value={categoryCount} className={statisticClassName}/>
                <Statistic title="Tag" value={tagCount} className={statisticClassName}/>
            </Flex>
            <Divider className='mt-4 mb-0'/>
        </Modal>
    </>
}

export default Header;
