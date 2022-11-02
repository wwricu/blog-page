import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        sysUser: {
            id: Number,
            userName: String,
            email: String,
            roles: [{
                id: Number,
                name: String,
                description: String,
                permissions: []
            }]
        },
    }),
})
// {"obj":{"id":1,"userName":"wwr","email":"iswangwr@gmail.com","roles":[{"id":1,"name":"admin","description":null,"permissions":[]}]},"message":null,"status":"success"}