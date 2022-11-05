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
      path: '/editor',
      name: 'editor',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/EditorView.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('@/views/ManageView.vue'),
      children: [
        {
          path: 'category',
          name: 'category',
          component: () => import('@/views/subviews/CategoryManageView.vue'),
        }
      ]
    }
  ]
})

export default router
