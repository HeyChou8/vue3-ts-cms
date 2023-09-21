<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" width="50px" align="center" />
        <el-table-column
          type="index"
          label="序号"
          width="60px"
          align="center"
        />
        <el-table-column
          prop="name"
          label="部门名称"
          width="150px"
          align="center"
        />
        <el-table-column
          prop="leader"
          label="部门领导"
          width="150px"
          align="center"
        />
        <el-table-column
          align="center"
          label="上级部门"
          prop="parentId"
          width="150px"
        />
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElTable } from 'element-plus'
import { ref } from 'vue'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
//自定义事件
const emit = defineEmits(['newClick', 'editClick'])
const systemStore = useSystemStore()
const { pageList, pageTotalCount } = storeToRefs(systemStore)
//分页器
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
//定义函数，发送网络请求
function fetchPageListData(formData: any = {}) {
  // 获取size和offset
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  //发送网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction('department', queryInfo)
}
//删除操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction('department', id)
}
//新建用户操作
function handleNewUserClick() {
  emit('newClick')
}
//编辑用户操作
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.user-content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
