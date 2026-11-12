import React from "react"
import type { Metadata } from "next"
import '@/styles/globals.css'
import Header from "@/components/Header"
import {DarkTheme, LightTheme, sansSerif, SiteUrl} from "@/common/common"
import Sidebar from "@/components/Sidebar"
import SidebarBrowse from "@/components/SidebarBrowse"
import {Analytics} from "@vercel/analytics/next"
import {GetSiteAPI} from "@/common/api"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
    const site = await GetSiteAPI()
    const title = [site.title, site.tagline].filter(Boolean).join(' - ')
    return {
        metadataBase: new URL(SiteUrl),
        title: title ? {default: title, template: site.title ? `%s - ${site.title}` : '%s'} : undefined,
        description: site.tagline || undefined,
        openGraph: {
            siteName: site.title || undefined,
        },
    }
}

const Footer = ({title}: { title: string }) => {
    return (
        <footer className='lg:hidden w-full shrink-0 border-t border-base-300 py-4 text-center text-xs text-base-content/45'>
            {title} {new Date().getFullYear()}
        </footer>
    )
}

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const site = await GetSiteAPI()
    return (
        <html lang="zh-CN" className={sansSerif.variable}>
            <head>
                <script dangerouslySetInnerHTML={{__html: `try{const t=localStorage.getItem('theme');if(t==='${LightTheme}'||t==='${DarkTheme}')document.documentElement.dataset.theme=t}catch{}`}}/>
            </head>
            <body className='flex flex-col min-h-screen bg-base-200'>
                <div className='lg:hidden'>
                    <Header site={site}/>
                </div>
                <div className='flex w-full flex-1'>
                    <Sidebar site={site}>
                        <SidebarBrowse/>
                    </Sidebar>
                    <div className='flex flex-col flex-1 min-w-0 bg-base-200'>
                        <main className='flex flex-col flex-1 items-center'>{children}</main>
                        <Footer title={site.title}/>
                    </div>
                </div>
                <Analytics/>
            </body>
        </html>
    )
}
