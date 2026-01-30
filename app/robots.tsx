import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: ['/_next/', '/api/'],
            },
            {
                userAgent: 'Baiduspider',
                disallow: '/',
            }
        ],
        sitemap: 'https://acme.com/sitemap.xml',
    }
}
