<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal ref="modalRef" :modal-config="modalConfigRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/searchConfig'
import contentConfig from './config/contentConfig'
import modalConfig from './config/modalConfig'
import { computed } from 'vue'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})
// 点击search，content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 点击content，modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style lang="less" scoped>
.department {
  border-radius: 8px;
  overflow: hidden;
}
</style>
