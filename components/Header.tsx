import React from 'react';
import {AppstoreOutlined, HomeOutlined, InfoCircleOutlined, TagsOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import Link from "next/link";


const Header: React.FC = () => {
    // TODO: display: block make diff on menu line height
    return <Menu className='leading-10 block' mode="horizontal">
        <Menu.Item key="home" icon={(<HomeOutlined/>)}>
            <Link href="/" rel="noopener noreferrer">Home</Link>
        </Menu.Item>
        <Menu.Item key="categories" icon={(<AppstoreOutlined/>)}>
            <Link href="/category" rel="noopener noreferrer">Category</Link>
        </Menu.Item>
        <Menu.Item key="tags" icon={(<TagsOutlined/>)}>
            <Link href="/tag" rel="noopener noreferrer">Tags</Link>
        </Menu.Item>
        <Menu.Item className='float-right' key="about" icon={(<InfoCircleOutlined/>)}>
            <Link href="/about" rel="noopener noreferrer">About</Link>
        </Menu.Item>
    </Menu>;
};

export default Header;
