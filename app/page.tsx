"use client"

import { Layout } from 'antd';
import AppMenu from "@/app/components/menu";
import AppContent from "@/app/components/Content";
import React from "react";

const { Footer, Content } = Layout;

export default function Home() {
  return (
      <Layout>
          <AppMenu/>
          <Content style={{ padding: '24' }}>
              <AppContent/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>wwr.icu 2025</Footer>
      </Layout>
  );
}
