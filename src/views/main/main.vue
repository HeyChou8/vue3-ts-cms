<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainHeader from '@/components/main-header/main-header.vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import { ref } from 'vue'
// 处理main-header中折叠的变化
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .el-container {
    height: 100%;
    .el-main {
      background-color: #f0f2f5;
    }
  }
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
