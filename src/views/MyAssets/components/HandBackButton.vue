<template>
  <n-button class="ml-10" color="#6a83d0" @click="handbackDialog = true">
    退还
  </n-button>
  <Dialog
    v-model="handbackDialog"
    title="退还"
    @cancel="handbackDialog = false"
    @confirm="confirm"
  >
    退还后请将物品归还至管理员处！
  </Dialog>
</template>

<script setup lang="ts">
import { ApplyApi, IApply } from '@/api/apply'
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'

const props = defineProps<{
  asset: IApply
}>()
const emits = defineEmits(['flush'])

const handbackDialog = ref(false)
const confirm = () => {
  ApplyApi.updateApply(props.asset.id, { myStatus: 3 }).then((res) => {
    handbackDialog.value = false
    emits('flush')
  })
}
</script>

<style scoped></style>
