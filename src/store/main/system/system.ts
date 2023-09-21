import {
  deleteUserById,
  editUserData,
  newUserData,
  postUsersListData,
  deletePageById,
  editPageData,
  newPageData,
  postPageListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      //删除数据操作
      const deleteResult = await deleteUserById(id)
      // console.log('删除数据成功', id)
      //删除后重新请求数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 创建新的用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      //重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 修改数据
      const editResult = await editUserData(id, userInfo)
      //重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    //针对页面的数据，增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      //删除数据操作
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      // console.log('删除数据成功', id)
      //删除后重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      //获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      // 创建新的用户
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      //重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      //获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      // 修改数据
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      //重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      //获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
