<template>
  <div class="sign-asset inline-block">
    <NButton @click="dialogVisible = true">签收</NButton>
  </div>

  <Dialog
    v-model="dialogVisible"
    @cancel="dialogVisible = false"
    @confirm="confirm"
    title="签收资产"
  >
    请到指定处签收物品并无误后进行确认，否则后果自负！
  </Dialog>
</template>

<script setup lang="ts">
import { ApplyApi, IApply } from '@/api/apply'
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'

const props = defineProps<{
  apply: IApply
}>()
const emits = defineEmits(['flush'])
const dialogVisible = ref(false)

const confirm = () => {
  ApplyApi.updateApply(props.apply.id, {
    signTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status: 5,
  }).then(() => {
    window.$message.success('签收成功！')
    dialogVisible.value = false
    emits('flush')
  })
}
</script>

<style scoped></style>
