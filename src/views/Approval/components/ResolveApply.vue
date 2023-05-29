<template>
  <div class="ml-10 inline-block">
    <NButton
      strong
      secondary
      color="#6a83d0"
      size="small"
      @click="dialogVisible = true"
      >批准</NButton
    >
    <Dialog
      :model-value="dialogVisible"
      title="同意申请"
      @close="close"
      @cancel="dialogVisible = false"
      @confirm="confirmResolve"
    >
      <n-form-item label="备注" label-placement="left">
        <n-input v-model:value="remark" placeholder="请输入备注" />
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
const remark = ref('')

const confirmResolve = () => {
  ApplyApi.updateApply(props.apply.id, {
    remark: remark.value,
    approveUserId: userStore.userInfo?.id,
    approveTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status: 2,
  }).then(() => {
    window.$message.success('操作成功！')
    dialogVisible.value = false
    remark.value = ''
    emits('flush')
  })
}

const close = () => {
  remark.value = ''
  dialogVisible.value = false
}
</script>

<style scoped></style>
