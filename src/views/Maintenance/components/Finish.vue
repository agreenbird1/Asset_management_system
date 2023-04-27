<template>
  <div class="finish inline-block">
    <n-button color="#6a83d0" size="small" @click="dialogVisible = true"
      >完成</n-button
    >
    <Dialog
      v-model="dialogVisible"
      title="报废"
      @cancel="dialogVisible = false"
      @confirm="confirm"
    >
      <n-form-item label="预估损失价值" label-placement="left">
        <n-input
          v-model:value="maintenanceValue"
          placeholder="请输入预估损失价值"
        />
      </n-form-item>
      <span style="color: #bbb">请确认此物品已经维修完成！</span>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { IMaintenance, MaintenanceApi } from '@/api/maintenance'
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'

const props = defineProps<{
  maintenance: IMaintenance
}>()
const emits = defineEmits(['flush'])

const dialogVisible = ref(false)
const maintenanceValue = ref<number>()

const confirm = () => {
  if(!maintenanceValue.value) return
  MaintenanceApi.update(
    props.maintenance.id,
    1,
    props.maintenance.asset.id!,
    maintenanceValue.value
  ).then(() => {
    dialogVisible.value = false
    emits('flush')
  })
}
</script>

<style scoped></style>
