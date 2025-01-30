import React from 'react';
import {AppstoreOutlined, HomeOutlined, TagsOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: (
            <a href="/" rel="noopener noreferrer">
                Home
            </a>
        ),
        key: 'home',
        icon: <HomeOutlined/>,
    },
    {
        label: (
            <a href="/category" rel="noopener noreferrer">
                Category
            </a>
        ),
        key: 'category',
        icon: <AppstoreOutlined/>,
    },
    {
        label: (
            <a href="/tag" rel="noopener noreferrer">
                Tags
            </a>
        ),
        key: 'tags',
        icon: <TagsOutlined/>,
    },
];

const Header: React.FC = () => {
    return <Menu selectable={false} mode="horizontal" items={items} />;
};

export default Header;
