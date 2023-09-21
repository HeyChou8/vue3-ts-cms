<template>
  <div class="user-search">
    <!-- 搜索表单 -->
    <el-form size="large" label-width="80px" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              placeholder="请输入查询的用户名"
              v-model="searchForm.name"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入查询的真实姓名"
              v-model="searchForm.realname"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              placeholder="请输入查询的手机号码"
              v-model="searchForm.cellphone"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              style="width: 100%"
              placeholder="请选择查询的状态"
              v-model="searchForm.enable"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="creatAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 重置和查询按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleRefreshClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleSearchClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})
//重置按钮
const formRef = ref<InstanceType<typeof ElForm>>()
function handleRefreshClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
//查询按钮
function handleSearchClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px;
}
.el-form-item {
  padding: 20px 30px;
  margin-bottom: 0;
}
.btns {
  text-align: right;
  padding: 0 50px 10px 0;

  .el-button {
    height: 36px;
  }
}
</style>
