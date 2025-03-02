import React, {useEffect, useState} from 'react';
import {
    AppstoreOutlined,
    GithubOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    MailOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {Button, Divider, Flex, Modal, Statistic} from 'antd';
import {GetAboutAPI} from "@/common/api";


const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)

    const statisticClassName = 'text-sm text-center'
    const menuItemClassName = 'rounded-xl border-0 shadow-none max-sm:px-1'

    useEffect(() => {
        GetAboutAPI().then((res) => {
            setAbout(res.content)
            setPostCount(res.post_count)
            setCategoryCount(res.category_count)
            setTagCount(res.tag_count)
        })
    }, []);
    return <>
        <Flex justify='space-between' align='center' className='sm:h-10 bg-white'>
            {/*TODO: grid*/}
            <Flex justify='space-around'>
                <Button href='/' className={menuItemClassName}>
                    <HomeOutlined/>Home
                </Button>
                <Button href='/categories' className={menuItemClassName}>
                    <AppstoreOutlined/>Category
                </Button>
                <Button href='/categories' className={menuItemClassName}>
                    <TagsOutlined/>Tags
                </Button>
            </Flex>
            <Button onClick={() => setIsModalOpen(true)} className={menuItemClassName}>
                <InfoCircleOutlined/>About
            </Button>
        </Flex>
        <Modal
            footer={null}
            closable={false}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => setIsModalOpen(false)}
        >
            <div dangerouslySetInnerHTML={{__html: about}} className='min-h-48'/>
            <Divider className='mb-4'/>
            <Flex justify='space-around'>
                <Statistic title="Post" value={postCount} className={statisticClassName}/>
                <Statistic title="Category" value={categoryCount} className={statisticClassName}/>
                <Statistic title="Tag" value={tagCount} className={statisticClassName}/>
            </Flex>
            <Divider className='my-4'/>
            <Flex justify='space-between'>
            <Button type='primary' href='https://github.com/wwricu' target='_blank' className='m-2 grow'><GithubOutlined/>GitHub</Button>
            <Button href='mailto:me@wwr.icu' className='m-2 grow'><MailOutlined/>Mail me</Button>
            </Flex>
        </Modal>
    </>
}

export default Header;
