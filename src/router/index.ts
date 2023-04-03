import { createRouter, createWebHistory } from 'vue-router'

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
          path: 'enterprise-member',
          name: 'EnterpriseMember',
          component: () => import('@/views/EnterpriseMember/index.vue'),
        },
        {
          path: 'classification',
          name: 'Classification',
          component: () => import('@/views/Classification/index.vue'),
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
        {
          path: 'enterprise-manage',
          name: 'EnterpriseManage',
          component: () => import('@/views/EnterpriseManage/index.vue'),
        },
      ],
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

export default router
