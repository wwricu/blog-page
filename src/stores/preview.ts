import { defineStore } from 'pinia'
import {ref} from "vue";
import type {ResourcePreview} from "@/types/schemas/resource";


export const usePreviewStore = defineStore('preview', () => {
    const previewStore = ref()
    const countStore = ref()
    previewStore.value = new Map()
    countStore.value = new Map()

    const clear = () => {
        previewStore.value.clear()
        countStore.value.clear()
    }

    const getCount = (
        parent_url: string | undefined = '/',
        categoryName: string | undefined = 'default_category_name_for_store_use',
        tagName: string | undefined = 'default_tag_name_for_store_use',
    ): number | undefined => {
        if (parent_url[0] !== '/') {
            parent_url = '/' + parent_url
        }
        const parentDict = countStore.value.get(parent_url)
        if (parentDict === undefined) {
            return undefined
        }
        const categoryDict = parentDict.get(categoryName)
        if (categoryDict === undefined) {
            return undefined
        }
        return categoryDict.get(tagName)
    }

    const setCount = (
        count: number,
        parent_url: string | undefined = '/',
        categoryName: string | undefined = 'default_category_name_for_store_use',
        tagName: string | undefined = 'default_tag_name_for_store_use',
    ) => {
        if (parent_url[0] !== '/') {
            parent_url = '/' + parent_url
        }
        let parentDict = countStore.value.get(parent_url)
        if (parentDict === undefined) {
            parentDict = new Map()
            countStore.value.set(parent_url, parentDict)
        }
        let categoryDict = parentDict.get(categoryName)
        if (categoryDict === undefined) {
            categoryDict = new Map()
            parentDict.set(categoryName, categoryDict)
        }
        categoryDict.set(tagName, count)
    }

    const getPreview = (
        parent_url: string | undefined = '/',
        categoryName: string | undefined = 'default_category_name_for_store_use',
        tagName: string | undefined = 'default_tag_name_for_store_use',
        pageIdx: number | undefined = 1
    ): ResourcePreview[] | undefined => {
        if (parent_url[0] !== '/') {
            parent_url = '/' + parent_url
        }
        const parentDict = previewStore.value.get(parent_url)
        if (parentDict === undefined) {
            return undefined
        }
        const categoryDict = parentDict.get(categoryName)
        if (categoryDict === undefined) {
            return undefined
        }
        const tagDict = categoryDict.get(tagName)
        if (tagDict === undefined) {
            return undefined
        }
        return tagDict.get(pageIdx)
    }

    const setPreview = (
        preview: ResourcePreview[],
        parent_url: string | undefined = '/',
        categoryName: string | undefined = 'default_category_name_for_store_use',
        tagName: string | undefined = 'default_tag_name_for_store_use',
        pageIdx: number | undefined = 1
    ) => {
        if (parent_url[0] !== '/') {
            parent_url = '/' + parent_url
        }
        let parentDict = previewStore.value.get(parent_url)
        if (parentDict === undefined) {
            parentDict = new Map()
            previewStore.value.set(parent_url, parentDict)
        }
        let categoryDict = parentDict.get(categoryName)
        if (categoryDict === undefined) {
            categoryDict = new Map()
            parentDict.set(categoryName, categoryDict)
        }
        let tagDict = categoryDict.get(tagName)
        if (tagDict === undefined) {
            tagDict = new Map()
            categoryDict.set(tagName, tagDict)
        }
        tagDict.set(pageIdx, preview)
    }

    return { getCount, setCount, getPreview, setPreview, clear }
})
