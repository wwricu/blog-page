import {JetBrains_Mono, Noto_Sans} from "next/font/google";

export type PathParams = {
    id?: string
    filter?: string
    name?: string
    index?: string
}

export type AsyncPathParams = {
    params: Promise<PathParams>
}

export const TagsUrl = 'tags'
export const CategoriesURL = 'categories'

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
