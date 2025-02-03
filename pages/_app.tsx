import "@/styles/globals.css"
import type {AppProps} from "next/app"
import Header from "@/components/Header";
import React from "react";
import {Divider, Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Layout className='min-h-lvh bg-white'>
            <Content>
                {/*<Flex justify='flex-start'>*/}
                {/*    <Sider/>*/}
                {/*    <Component {...pageProps} />*/}
                {/*</Flex>*/}
                <Header/>
                <Component {...pageProps} />
            </Content>
            <Footer className='text-center bg-transparent'>
                <>
                    <Divider/>
                    wwr.icu 2025
                </>
            </Footer>
        </Layout>
    )
}
