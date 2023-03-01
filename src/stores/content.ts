import { defineStore } from 'pinia'
import {ref} from "vue";
import type {ContentOutput} from "@/types/schemas/resource";


export const useContentStore = defineStore('content', () => {
    const contentStore = ref()
    contentStore.value = new Map()

    const get = (id: number | string | string[]): ContentOutput | undefined => {
        if (id) {
            return contentStore.value.get(`${id}`)
        }
    }

    const set = (id: number | undefined, content: ContentOutput) => {
        if (id && content) {
            contentStore.value.set(`${id}`, content)
        }
    }

    const clear = () => {
        contentStore.value.clear()
    }

    return { get, set, clear }
})
