<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof UserContent>>()
//查询操作
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
//重置操作
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
//新建操作
const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
//编辑操作
function handleEditClick(itemData: any) {
  modalRef.value.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
