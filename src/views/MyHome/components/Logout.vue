<template>
  <div>
    <img
      @click="showDialog = true"
      src="@/assets/imgs/退出.png"
      title="退出"
      class="cp"
      width="25"
    />
    <Dialog v-model="showDialog" title="退出登录" width="500px">
      退出登录后需要重新登录，确认退出登录吗？
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'

const showDialog = ref(false)
</script>

<style scoped></style>
