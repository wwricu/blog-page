import React, {cache} from "react"
import type { Metadata } from "next"
import '@/styles/globals.css'
import Header from "@/components/Header"
import {sansSerif, SiteUrl} from "@/common/common"
import Sidebar from "@/components/Sidebar"
import SidebarBrowse from "@/components/SidebarBrowse"
import {Analytics} from "@vercel/analytics/next"
import {GetSiteAPI} from "@/common/api"
import {SiteVO} from "@/common/model"

export const revalidate = 300

const emptySite: SiteVO = {
    title: '',
    tagline: '',
    content: '',
    post_count: 0,
    category_count: 0,
    tag_count: 0,
}

const loadSite = cache(async (): Promise<SiteVO> => {
    try {
        return await GetSiteAPI()
    } catch {
        return emptySite
    }
})

// Site-wide metadata; pages only override title/description/openGraph.url
export async function generateMetadata(): Promise<Metadata> {
    const site = await loadSite()
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
    const site = await loadSite()
    return (
        <html lang="zh-CN" className={sansSerif.variable}>
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
