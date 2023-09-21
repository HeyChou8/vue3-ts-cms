<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="selection" width="50px" align="center" />
        <el-table-column
          type="index"
          label="序号"
          width="60px"
          align="center"
        />
        <el-table-column
          prop="name"
          label="用户名"
          width="150px"
          align="center"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          width="150px"
          align="center"
        />
        <el-table-column
          prop="cellphone"
          label="手机号码"
          align="center"
          width="150px"
        />
        <el-table-column
          prop="enable"
          label="状态"
          align="center"
          width="100px"
        >
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>

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
              v-if="isUpdate"
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="isDelete"
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
        :total="userTotalCount"
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
import usePermissions from '@/hooks/usePermissions'
//自定义事件
const emit = defineEmits(['newClick', 'editClick'])
const systemStore = useSystemStore()
const { userList, userTotalCount } = storeToRefs(systemStore)
//用户权限的判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:update')
const isQuery = usePermissions('users:query')
//分页器
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}
//定义函数，发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  // 获取size和offset
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  //发送网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUserListAction(queryInfo)
}
//删除操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}
//新建用户操作
function handleNewUserClick() {
  emit('newClick')
}
//编辑用户操作
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchUserListData })
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
