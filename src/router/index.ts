import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginPage
    },
    {
      path: '/login',
      name: 'home',
      component: LoginPage
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('@/views/ManageView.vue'),
      children: [
        {
          path: 'editor',
          name: 'editor',
          component: () => import('@/views/subviews/EditorView.vue')
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('@/views/subviews/CategoryManageView.vue'),
        },
      ]
    }
  ]
})

export default router
