import "@/styles/globals.css"
import type {AppProps} from "next/app"
import Header from "@/components/Header";
import React from "react";
import {Divider, Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Layout className='min-h-lvh bg-slate-100'>
            <Content>
                <Header/>
                <Component {...pageProps} />
            </Content>
            <Footer className='shadow-md text-center bg-white mt-0 pt-0'>
                <>
                    <Divider className='mt-0'/>
                    wwr.icu 2025
                </>
            </Footer>
        </Layout>
    )
}
