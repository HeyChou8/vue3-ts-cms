<template>
  <div class="page-search" v-if="isQuery">
    <!-- 搜索表单 -->
    <el-form
      size="large"
      :label-width="searchConfig.labelWidth ?? '80px'"
      :model="searchForm"
      ref="formRef"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="searchForm[item.prop]"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import usePermissions from '@/hooks/usePermissions'

// 定义自定义事件/接收的属性
interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()
//获取权限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)
// 定义form的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)
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
.page-search {
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
