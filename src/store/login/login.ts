import {
  accountLoginRequest,
  getUserMenuByRoleId,
  getUserInfoById
} from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToPermissions, mapMenuToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'
interface ILoginState {
  token: string
  userInfo: any
  userMenu: any[]
  permissions: string[]
}
const useLoginStore = defineStore('login', {
  // 制定state的类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenu: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //账号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      // 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      //获取登录用户的详细信息（role信息）
      const useInfoResult = await getUserInfoById(id)
      const userInfo = useInfoResult.data
      this.userInfo = userInfo
      //根据角色请求用户的权限（菜单menus）
      const userMenuResult = await getUserMenuByRoleId(this.userInfo.role.id)
      const userMenu = userMenuResult.data
      this.userMenu = userMenu
      // 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenu', userMenu)
      // 请求所有的roles，departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      //获取登录用户的所有按钮权限
      const permissions = mapMenusToPermissions(userMenu)
      this.permissions = permissions
      //动态添加路由
      const routes = mapMenuToRoutes(userMenu)
      routes.forEach((route) => router.addRoute('main', route))
      // 跳转到main页面
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu
        //请求所有roles和departments的数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        //获取按钮权限
        const permissions = mapMenusToPermissions(userMenu)
        this.permissions = permissions
        //动态添加路由
        const routes = mapMenuToRoutes(userMenu)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
