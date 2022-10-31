import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        userInfo: Object,
        folderStruct: Object,
    }),
})