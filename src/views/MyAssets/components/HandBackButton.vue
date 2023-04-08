<template>
  <n-button class="ml-10" color="#6a83d0" @click="handbackDialog = true">
    退还
  </n-button>
  <Dialog v-model="handbackDialog" title="退还">
    退还后请将物品归还至管理员处！
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'

const handbackDialog = ref(false)
</script>

<style scoped></style>
