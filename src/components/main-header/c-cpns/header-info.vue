<template>
  <div class="header-info">
    <!-- 1.操作小图标 -->
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <!-- 个人信息 -->
    <div class="info">
      <el-dropdown trigger="hover">
        <span class="user-info">
          <el-avatar
            :size="30"
            src="data:image/jpeg;base64,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"
          />
          <span class="name">{{ loginStore.userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'

const router = useRouter()
// 退出登录
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
const loginStore = useLoginStore()
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}
//el-menu没在app里面，所以:globe()，可以修改这个html的样式
//:deep()是用来改变组件的里的样式，如果是组件根元素的样式，那可以直接修改，如果是组件根元素的子元素，那必须要
//用这个才能访问到
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
