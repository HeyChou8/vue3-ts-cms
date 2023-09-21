<template>
  <div class="header-crumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const userMenu = useLoginStore().userMenu
const route = useRoute()
const breadCrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenu)
})
</script>

<style lang="less" scoped></style>
