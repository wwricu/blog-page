import React from 'react';
import {AppstoreOutlined, HomeOutlined, TagsOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from "next/link";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: (
            <Link href="/" rel="noopener noreferrer">
                Home
            </Link>
        ),
        key: 'home',
        icon: <HomeOutlined/>,
    },
    {
        label: (
            <Link href="/category" rel="noopener noreferrer">
                Category
            </Link>
        ),
        key: 'category',
        icon: <AppstoreOutlined/>,
    },
    {
        label: (
            <Link href="/tag" rel="noopener noreferrer">
                Tags
            </Link>
        ),
        key: 'tags',
        icon: <TagsOutlined/>,
    },
];

const Header: React.FC = () => {
    return <Menu selectable={false} mode="horizontal" items={items} />;
};

export default Header;
