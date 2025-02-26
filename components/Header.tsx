import React, {useState} from 'react';
import {AppstoreOutlined, HomeOutlined, InfoCircleOutlined, TagsOutlined} from '@ant-design/icons';
import {Menu, Modal} from 'antd';
import Link from "next/link";


const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    </>
}

export default Header;
