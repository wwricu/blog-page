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
export const LightTheme = 'paper'
export const DarkTheme = 'night'


export const convertMarkersToHtml = (text: string | null | undefined): string => {
    if (!text) return ''
    return text.replace(/\x01/g, '<mark>').replace(/\x02/g, '</mark>')
}

// Reading time: CJK is counted per character, Latin per word (~2 characters each)
export const estimateReadMinutes = (html: string | null | undefined): number => {
    if (!html) return 0
    const cjkPattern = '[\\u3400-\\u4dbf\\u4e00-\\u9fff\\u3040-\\u30ff\\uac00-\\ud7af]'
    const text = html.replace(/<[^>]*>/g, ' ')
    const cjk = (text.match(new RegExp(cjkPattern, 'g')) ?? []).length
    const words = (text.replace(new RegExp(cjkPattern, 'g'), ' ').match(/[a-zA-Z0-9]+/g) ?? []).length
    return Math.max(1, Math.round((cjk + words * 2) / 400))
}

export const sansSerif = Noto_Sans({
    subsets: ['latin', 'latin-ext', 'greek', 'cyrillic'],
    // font-light, font-normal, font-medium, font-semibold, font-bold
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    // Exposed as --font-noto so globals.css can append the CJK fallbacks next/font cannot know
    variable: '--font-noto',
})

export const monospace = JetBrains_Mono({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
})
