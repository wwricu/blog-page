import { Flex } from "antd";
import React from "react";
import Link from "next/link";
import {AppstoreOutlined, HomeOutlined, InfoCircleOutlined, TagsOutlined} from "@ant-design/icons";

type SiderButtonProps = {
    href: string
    icon?: React.ReactNode
    children?: React.ReactNode
}

const SiderButton: React.FC<SiderButtonProps> = ({href, icon, children}) => {
    return (
        <Flex className='text-lg' justify='space-around'>
            {icon}
            <Link className='font-serif' href={href}>{children}</Link>
        </Flex>
    )
}

export default function Sider() {
    return (
        <div className='h-lvh w-64 bg-slate-100'>
            <Flex className='w-64 h-lvh fixed' vertical justify='space-between' align='center'>
                <Flex vertical align='start'>
                    <SiderButton href='/' icon={(<HomeOutlined/>)}>Home</SiderButton>
                    <SiderButton href='/categories' icon={(<AppstoreOutlined/>)}>Categories</SiderButton>
                    <SiderButton href='/tags' icon={(<TagsOutlined/>)}>Tags</SiderButton>
                    <SiderButton href='/about' icon={(<InfoCircleOutlined/>)}>About</SiderButton>
                </Flex>
            </Flex>
        </div>

    )
}