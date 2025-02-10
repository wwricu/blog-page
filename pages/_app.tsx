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
                <Header/>
                <div className='bg-slate-100'>
                    <Component {...pageProps} />
                </div>
            </Content>
            <Footer className='shadow-md text-center bg-transparent mt-0 pt-0'>
                <>
                    <Divider className='mt-0'/>
                    wwr.icu 2025
                </>
            </Footer>
        </Layout>
    )
}
