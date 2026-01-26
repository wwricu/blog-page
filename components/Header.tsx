import React, {useEffect, useState} from 'react';
import {
    AppstoreOutlined,
    GithubOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    MailOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {Modal, Statistic} from 'antd';
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
    const menuItemClassName = 'btn btn-sm h-full font-light rounded-none border-0 shadow-none max-sm:px-2 text-text-prime'

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
                        <button className={menuItemClassName + getButtonStyle('/')}>
                            <HomeOutlined/>Home
                        </button>
                    </Link>
                    <Link href='/categories' className='h-full'>
                        <button className={menuItemClassName + getButtonStyle('/categories')}>
                            <AppstoreOutlined/>Category
                        </button>
                    </Link>
                    <Link href='/tags' className='h-full'>
                        <button onClick={() => router.push('/tags')} className={menuItemClassName + getButtonStyle('/tags')}>
                            <TagsOutlined/>Tags
                        </button>
                    </Link>
                </div>
                <button onClick={() => setIsModalOpen(true)} className={menuItemClassName + ' hover:!bg-slate-300 hover:!text-text-prime ' + (isModalOpen ? ' bg-indigo-600 text-white' : 'bg-transparent')}>
                    <InfoCircleOutlined/>
                    <span className='max-sm:hidden'>
                    About
                </span>
                </button>
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
                    <Link href='https://github.com/wwricu'>
                        <button className='btn btn-active btn-neutral btn-sm m-2 rounded grow'><GithubOutlined/>GitHub</button>
                    </Link>
                    <Link href='mailto:me@wwr.icu'>
                        <button className='btn bg-white text-black border-[#e5e5e5] rounded-s btn-sm rounded m-2 grow'>
                            <MailOutlined/>Mail me
                        </button>
                    </Link>
                </div>
            </Modal>
        </>
    )
}

export default Header;
