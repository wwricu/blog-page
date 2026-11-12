import {JetBrains_Mono, Noto_Sans} from "next/font/google"

export const TagsUrl = 'tags'
export const CategoriesURL = 'categories'
export const SearchUrl = 'search'
export const SiteUrl = process.env.NEXT_SITE_URL || 'https://wwr.icu'
export const IconClassNames = 'inline stroke-2 w-3.75 h-3.75'
export const LightTheme = 'paper'
export const DarkTheme = 'night'

export const estimateReadMinutes = (html: string | null | undefined): number => {
    if (!html) return 0
    const cjkPattern = '[\\u3400-\\u4dbf\\u4e00-\\u9fff\\u3040-\\u30ff\\uac00-\\ud7af]'
    const text = html.replace(/<pre[\s\S]*?<\/pre>/g, ' ').replace(/<[^>]*>/g, ' ')
    const cjk = (text.match(new RegExp(cjkPattern, 'g')) ?? []).length
    const words = (text.replace(new RegExp(cjkPattern, 'g'), ' ').match(/[a-zA-Z0-9]+/g) ?? []).length
    return Math.max(1, Math.round((cjk + words * 2) / 400))
}

export const sansSerif = Noto_Sans({
    subsets: ['latin', 'latin-ext', 'greek', 'cyrillic'],
    // font-light, font-normal, font-medium, font-semibold, font-bold
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-noto',
})

export const monospace = JetBrains_Mono({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    preload: false,
})
