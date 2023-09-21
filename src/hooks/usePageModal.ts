import type PageModal from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'
type CallbackFnType = (data?: any) => void
function usePageModal(
  newCallback?: CallbackFnType,
  editCallback?: CallbackFnType
) {
  //新建操作
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  //编辑操作
  function handleEditClick(itemData: any) {
    // 让modal显示出来
    modalRef.value?.setModalVisible(false, itemData)
    // 编辑的回调
    if (editCallback) editCallback(itemData)
  }
  return { modalRef, handleNewClick, handleEditClick }
}
export default usePageModal
