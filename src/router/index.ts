import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginView.vue'
import {useLoginStore} from "@/stores/login";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:filter?/:id?',
      name: 'home',
      component: () => import('@/views/MainView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/content/:id',
      name: 'content',
      component: () => import('@/views/BlogView.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('@/views/ManageView.vue'),
      meta: {
        roles: ['admin']
      },
      children: [
        {
          path: 'editor/:id',
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
        {
          path: 'tag',
          name: 'tag',
          component: () => import('@/views/manage_subviews/TagManageView.vue'),
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/') {
    return next()
  }

  const roles = to.meta.roles as string[]
  if (roles != null) {
    const loginStore = useLoginStore()
    if (loginStore.userInfo == null || loginStore.isLogin !== true) {
      return next('/')
    }
    for (const role of roles) {
      for (const userRole of loginStore.userInfo.roles) {
        if (userRole.name === role) {
          return next()
        }
      }
    }
    return next('/')
  }
  return next()
})

export default router
