import React, {useEffect, useState} from 'react';
import {
    AppstoreOutlined,
    GithubOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    MailOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {Button, Modal, Statistic} from 'antd';
import {GetAboutAPI} from "@/common/api";
import {useRouter} from "next/router";
import Link from "next/link";

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [about, setAbout] = useState<string>('')
    const [postCount, setPostCount] = useState<number>(0)
    const [categoryCount, setCategoryCount] = useState<number>(0)
    const [tagCount, setTagCount] = useState<number>(0)
    const router = useRouter()

    const statisticClassName = 'text-sm text-center'
    const menuItemClassName = 'h-full rounded-none border-0 shadow-none max-sm:px-2 text-text-prime'

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
            return ' bg-transparent'
        }
        return router.pathname.replace(/\/\[.*]/g, "") === path ?
            ' bg-indigo-600 text-white hover:!bg-indigo-600 hover:!text-white' :
            ' hover:!bg-slate-300 bg-transparent hover:!text-text-prime'
    }

    return (
        <>
            <div className='flex justify-between items-center sm:h-10 bg-transparent flex-wrap border-solid border-b-2'>
                <div className='flex justify-start items-center flex-wrap h-full'>
                    <Link href='/' className='h-full'>
                        <Button className={menuItemClassName + getButtonStyle('/')}>
                            <HomeOutlined/>Home
                        </Button>
                    </Link>
                    <Link href='/categories' className='h-full'>
                        <Button className={menuItemClassName + getButtonStyle('/categories')}>
                            <AppstoreOutlined/>Category
                        </Button>
                    </Link>
                    <Link href='/tags' className='h-full'>
                        <Button onClick={() => router.push('/tags')} className={menuItemClassName + getButtonStyle('/tags')}>
                            <TagsOutlined/>Tags
                        </Button>
                    </Link>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className={menuItemClassName + ' hover:!bg-slate-300 hover:!text-text-prime ' + (isModalOpen ? ' bg-indigo-600 text-white' : 'bg-transparent')}>
                    <InfoCircleOutlined/>
                    <span className='max-sm:hidden'>
                    About
                </span>
                </Button>
            </div>
            <Modal
                footer={null}
                closable={false}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
            >
                <div dangerouslySetInnerHTML={{__html: about}} className='min-h-48'/>
                <div className='divider mb-4'/>
                <div className='flex justify-around'>
                    <Statistic title="Post" value={postCount} className={statisticClassName}/>
                    <Statistic title="Category" value={categoryCount} className={statisticClassName}/>
                    <Statistic title="Tag" value={tagCount} className={statisticClassName}/>
                </div>
                <div className='divider my-4'/>
                <div className='flex justify-between'>
                    <Button type='primary' href='https://github.com/wwricu' target='_blank' className='m-2 grow'><GithubOutlined/>GitHub</Button>
                    <Button href='mailto:me@wwr.icu' className='m-2 grow'><MailOutlined/>Mail me</Button>
                </div>
            </Modal>
        </>
    )
}

export default Header;
