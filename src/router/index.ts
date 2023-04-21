import { useUserStore } from '@/store/userStore'
import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
// 需要引入css
import 'nprogress/nprogress.css'
import pinia from '@/store'

const userStore = useUserStore(pinia)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/my-home',
      component: () => import('@/views/Home/index.vue'),
      children: [
        {
          path: 'my-home',
          name: 'MyHome',
          component: () => import('@/views/MyHome/index.vue'),
        },
        {
          path: 'my-assets',
          name: 'MyAssets',
          component: () => import('@/views/MyAssets/index.vue'),
        },
        {
          path: 'approval',
          name: 'Approval',
          component: () => import('@/views/Approval/index.vue'),
        },
        {
          path: 'enterprise-member',
          name: 'EnterpriseMember',
          component: () => import('@/views/EnterpriseMember/index.vue'),
        },
        {
          path: 'enterprise-assets',
          name: 'EnterpriseAssets',
          component: () => import('@/views/EnterpriseAssets/index.vue'),
        },
        {
          path: 'asset-monitoring',
          name: 'AssetMonitoring',
          component: () => import('@/views/AssetMonitoring/index.vue'),
        },
      ],
      beforeEnter(to) {
        if (to.path !== '/login' && !userStore.userInfo) {
          router.push('/login')
          return false
        }
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, left: 0 }
  },
})

router.beforeEach((to, from, next) => {
  nProgress.start()
  next()
})
router.afterEach(() => {
  nProgress.done()
})

export default router
