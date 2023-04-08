<template>
  <n-badge :value="1" dot :offset="[-2, 8]">
    <button class="notification-btn" @click="active = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-bell"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    </button>
  </n-badge>

  <n-drawer v-model:show="active" width="25%" class="p-10" placement="right">
    <div class="df mb-10" style="flex-direction: row-reverse">
      <n-button color="#6a83d0">已读所有信息</n-button>
    </div>
    <n-card hoverable>
      <div class="df jcsb aic">
        您申请的小米lite鼠标已经成功签收！
        <n-button color="#6a83d0" quaternary>标为已读</n-button>
      </div>
    </n-card>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NDrawer } from 'naive-ui'

const active = ref(false)

const closeMessage = () => {
  console.log('closeMessage')
}
</script>

<style scoped lang="less">
.notification-btn {
  color: var(--main-color);
  padding: 0;
  border: 0;
  background-color: transparent;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-status {
  color: var(--main-color);
}
</style>
