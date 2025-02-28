import React, {useEffect, useState} from 'react';
import {AppstoreOutlined, HomeOutlined, InfoCircleOutlined, TagsOutlined} from '@ant-design/icons';
import {Menu, Modal} from 'antd';
import Link from "next/link";
import {GetAboutAPI} from "@/common/api";


const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [about, setAbout] = useState<string>('')

    useEffect(() => {
        GetAboutAPI().then((res) => {
            setAbout(res ?? '')
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
            <div dangerouslySetInnerHTML={{__html: about}} ></div>
        </Modal>
    </>
}

export default Header;
