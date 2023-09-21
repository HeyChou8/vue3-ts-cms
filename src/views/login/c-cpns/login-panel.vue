<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <h1 class="title">后台管理系统</h1>
    <!-- 中间tabs的切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号登录的的pane -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span>帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef"></pane-account>
        </el-tab-pane>
        <!-- 手机登录的pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </div>
          </template>
          <pane-phone></pane-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />

      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-button type="primary" size="large" @click="handleBtnClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
const activeName = ref('account')
const isRememberPassword = ref<boolean>(
  localCache.getCache('isRemPwd') ?? false
)
watch(isRememberPassword, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const accountRef = ref<InstanceType<typeof PaneAccount>>()
function handleBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRememberPassword.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  .title {
    height: 70px;
    text-align: center;
    line-height: 70px;
  }
  .controls {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    .el-button {
      width: 330px;
    }
  }
}
</style>
