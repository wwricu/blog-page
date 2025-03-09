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
import {useRouter} from "next/router";


const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)
    const router = useRouter()

    const statisticClassName = 'text-sm text-center'
    const menuItemClassName = 'h-full rounded-none border-0 shadow-none max-sm:px-2 bg-transparent'

    useEffect(() => {
        GetAboutAPI().then((res) => {
            setAbout(res.content)
            setPostCount(res.post_count)
            setCategoryCount(res.category_count)
            setTagCount(res.tag_count)
        })
    }, []);


    const getButtonStyle = (path: string) => {
        if (isModalOpen) {
            return ''
        }
        return router.pathname.replace(/\/\[.*]/g, "") === path ?
            ' bg-indigo-600 text-white hover:!bg-indigo-600 hover:!text-white' :
            ' hover:!bg-slate-300 hover:!text-black'
    }

    return <>
        <Flex justify='space-between' align='center' className='sm:h-10 bg-white flex-wrap'>
            {/*TODO: grid for width narrower than 260px*/}
            <Flex justify='flex-start' align='center' className='flex-wrap h-full'>
                <Button onClick={() => router.push('/')} className={menuItemClassName + getButtonStyle('/')}>
                    <HomeOutlined/>Home
                </Button>
                <Button onClick={() => router.push('/categories')} className={menuItemClassName + getButtonStyle('/categories')}>
                    <AppstoreOutlined/>Category
                </Button>
                <Button onClick={() => router.push('/tags')} className={menuItemClassName + getButtonStyle('/tags')}>
                    <TagsOutlined/>Tags
                </Button>
            </Flex>
            <Button onClick={() => setIsModalOpen(true)} className={menuItemClassName + ' hover:!bg-slate-300 hover:!text-black ' + (isModalOpen ? ' bg-indigo-600 text-white' : '')}>
                <InfoCircleOutlined/>
                <span className='max-sm:hidden'>
                    About
                </span>
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
