import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue'),
      children: [
        {
          path: '/main/analysis',
          redirect: '/main/analysis/overview'
        },
        {
          path: '/main/system',
          redirect: '/main/system/user'
        },
        {
          path: '/main/product',
          redirect: '/main/product/category'
        },
        {
          path: '/main/story',
          redirect: '/main/story/chat'
        }
      ]
      // children: [
      //   {
      //     path: '/main/analysis/overview',
      //     component: () => import('@/views/main/analysis/overview/overview.vue')
      //   },
      //   {
      //     path: '/main/analysis/dashboard',
      //     component: () =>
      //       import('@/views/main/analysis/dashboard/dashboard.vue')
      //   },
      //   {
      //     path: '/main/system/role',
      //     component: () => import('@/views/main/system/role/role.vue')
      //   },
      //   {
      //     path: '/main/system/user',
      //     component: () => import('@/views/main/system/user/user.vue')
      //   }
      // ]
    },
    {
      path: '/:pathMacth(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('./main') && !token) {
    return '/login'
  }
  //如果进入到main页面
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
