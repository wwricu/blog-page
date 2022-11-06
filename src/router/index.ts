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
          path: 'editor/:Id',
          name: 'editor',
          component: () => import('@/views/manage_subviews/EditorView.vue')
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('@/views/manage_subviews/BlogManageView.vue'),
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('@/views/manage_subviews/CategoryManageView.vue'),
        },
      ]
    }
  ]
})

export default router
