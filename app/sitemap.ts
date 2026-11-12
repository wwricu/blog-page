import type { MetadataRoute } from 'next'
import {GetAllBlogPosts} from '@/common/api'
import {CategoriesURL, SiteUrl, TagsUrl} from '@/common/common'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = SiteUrl
    const now = new Date()

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
        { url: `${siteUrl}/${CategoriesURL}`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
        { url: `${siteUrl}/${TagsUrl}`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    ]

    const page = await GetAllBlogPosts(1, 1000)
    const posts: MetadataRoute.Sitemap = (page?.data ?? []).map((post) => ({
        url: `${siteUrl}/detail/${post.id}`,
        lastModified: post.update_time || post.create_time || now,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))
    return [...staticPages, ...posts]
}
