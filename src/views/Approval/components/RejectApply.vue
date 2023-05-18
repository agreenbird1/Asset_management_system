<template>
  <div class="inline-block">
    <NButton
      strong
      secondary
      type="error"
      size="small"
      @click="dialogVisible = true"
      >拒绝</NButton
    >
    <Dialog
      :model-value="dialogVisible"
      title="驳回申请"
      @close="dialogVisible = false"
      @cancel="dialogVisible = false"
      @confirm="confirmReject"
    >
      <n-form-item label="原因" required label-placement="left">
        <n-input v-model:value="reason" placeholder="请输入驳回原因" />
      </n-form-item>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ApplyApi, IApply } from '@/api/apply'
import Dialog from '@/components/Dialog/index.vue'
import { useUserStore } from '@/store/userStore'
import dayjs from 'dayjs'
import { ref } from 'vue'

const props = defineProps<{
  apply: IApply
}>()
const emits = defineEmits(['flush'])

const userStore = useUserStore()
const dialogVisible = ref(false)
const reason = ref('')

const confirmReject = () => {
  if (!reason.value) return window.$message.warning('请输入驳回原因！')
  ApplyApi.updateApply(props.apply.id, {
    rejectReason: reason.value,
    approveUserId: userStore.userInfo?.id,
    approveTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status: 3,
  }).then(() => {
    window.$message.success('操作成功！')
    dialogVisible.value = false
    emits('flush')
  })
}
</script>

<style scoped></style>
