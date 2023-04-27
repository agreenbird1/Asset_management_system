<template>
  <div class="scrap inline-block">
    <n-button
      color="rgb(237, 158, 158)"
      size="small"
      @click="dialogVisible = true"
      >报废</n-button
    >
    <Dialog
      v-model="dialogVisible"
      title="报废"
      @cancel="dialogVisible = false"
      @confirm="confirm"
    >
      物品无法维修时将采取报废！请确定是否报废此件物品！
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

const confirm = () => {
  MaintenanceApi.update(
    props.maintenance.id,
    0,
    props.maintenance.asset.id!
  ).then(() => {
    dialogVisible.value = false
    emits('flush')
  })
}
</script>

<style scoped>
div {
  color: rgb(237, 158, 158);
}
</style>
