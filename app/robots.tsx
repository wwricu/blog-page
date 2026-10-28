import type { MetadataRoute } from 'next'
import {SiteUrl} from '@/common/common'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: ['/_next/', '/api/', '/search'],
            },
            {
                userAgent: 'Baiduspider',
                disallow: '/',
            }
        ],
        sitemap: `${SiteUrl}/sitemap.xml`,
    }
}
