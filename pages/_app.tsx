import "@/styles/globals.css"
import type {AppProps} from "next/app"
import Header from "@/components/Header";
import React from "react";
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <Layout style={{
            backgroundImage: 'url("https://www.toptal.com/designers/subtlepatterns/uploads/leaves.png")',
            minHeight: '100vh',
        }}>
            <Content>
                <Header/>
                <Component {...pageProps} />
            </Content>
            <Footer style={{ textAlign: 'center', background: 'transparent' }}>wwr.icu 2025</Footer>
        </Layout>
    )
}
