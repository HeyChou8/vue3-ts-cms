import type pageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'
function usePageContent() {
  //查询操作
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function handleQueryClick(formData: any) {
    contentRef.value?.fetchPageListData(formData)
  }
  // 重置操作
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }
  return { contentRef, handleQueryClick, handleResetClick }
}
export default usePageContent
