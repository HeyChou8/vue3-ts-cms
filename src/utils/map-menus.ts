import type { RouteRecordRaw } from 'vue-router'
function loadLocalRoutes() {
  //1.动态获取所有的路由对象，放到数组中
  // *路由对象都在独立的文件中
  // *从文件中将所有的路由对象读取放到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main中所有的ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export function mapMenuToRoutes(userMenu: any[]) {
  // 加载本地路由对象
  const localRoutes = loadLocalRoutes()
  // 2.根据菜单去匹配正确的路由对象
  // route.addRoute('main',xxx)
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route)
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}
interface IBreacrumbs {
  name: string
  path: string
}
export function mapPathToMenu(path: string, userMenu: any[]) {
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (path === submenu.url) return submenu
    }
  }
}
export function mapPathToBreadcrumbs(path: string, userMenu: any[]) {
  // 定义面包屑
  const breadcrumbs: IBreacrumbs[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        //顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        //匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}
/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @return 权限的数组string[]
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permission: string[] = []
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permission.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return permission
}
