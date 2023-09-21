<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFold"
      >
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

import { computed } from 'vue'
// 获取动态菜单
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu
//接收main传过来的props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
// 点击跳转路由
const router = useRouter()
function handleItemClick(subitem: any) {
  router.push(subitem.url)
}
//El的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenu)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
