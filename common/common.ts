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
export const iconClassNames = 'inline stroke-2 w-3.75 h-3.75'

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c] as string))

export const highlightKeyword = (text: string, keyword: string): string => {
    const escaped = escapeHtml(text)
    const tokens = keyword.split(/\s+/).filter(Boolean).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    if (!tokens.length) return escaped
    return escaped.replace(new RegExp(`(${tokens.join('|')})`, 'gi'), '<mark>$1</mark>')
}

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
