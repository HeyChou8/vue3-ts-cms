<template>
  <div class="pane-account">
    <el-form
      :model="account"
      label-width="60px"
      size="large"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
// 定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
// 定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入帐号', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20位数字或小写字母组成',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或小写字母组成',
      trigger: 'change'
    }
  ]
}
// 执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRememberPassword: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户输入的帐号和密码
      const name = account.name
      const password = account.password
      // 向服务器发送网络请求（携带帐号和密码）
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 判断是否需要记住密码
        if (isRememberPassword) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error(' 请您输入正确的格式')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
