<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import PageSearch from './c-cpns/page-search.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof PageContent>>()
//查询操作
function handleQueryClick(formData: any) {
  contentRef.value?.fetchPageListData(formData)
}
//重置操作
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
//新建操作
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
//编辑操作
function handleEditClick(itemData: any) {
  modalRef.value.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.department {
  border-radius: 8px;
  overflow: hidden;
}
</style>
