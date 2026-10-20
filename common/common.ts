import {JetBrains_Mono, Noto_Sans} from "next/font/google"

export type PathParams = {
    id?: string
    filter?: string
    name?: string
    index?: string
    keyword?: string
    className?: string
}

export type AsyncPathParams = {
    params: Promise<PathParams>
}

export const TagsUrl = 'tags'
export const CategoriesURL = 'categories'
export const SearchUrl = 'search'
// Single source of truth for absolute site URLs (metadataBase / sitemap / robots);
// NEXT_SITE_URL is often unset locally or in CI, so fall back to the production origin
export const SiteUrl = process.env.NEXT_SITE_URL || 'https://wwr.icu'
export const IconClassNames = 'inline stroke-2 w-3.75 h-3.75'
export const LightTheme = 'fantasy'
export const DarkTheme = 'abyss'


export const convertMarkersToHtml = (text: string | null | undefined): string => {
    if (!text) return ''
    return text.replace(/\x01/g, '<mark>').replace(/\x02/g, '</mark>')
}

export const sansSerif = Noto_Sans({
    subsets: ['latin', 'latin-ext', 'greek', 'cyrillic'],
    // font-light, font-normal, font-medium, font-semibold, font-bold
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
})

export const monospace = JetBrains_Mono({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
})
