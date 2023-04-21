<template>
  <div class="app-sidebar">
    <n-popover
      v-for="(item, i) in permission"
      :key="i"
      trigger="hover"
      placement="right"
      :show-arrow="false"
    >
      <template #trigger>
        <router-link
          :to="{ path: item.route }"
          class="app-sidebar-link"
          :class="{ active: $route.path == item.route }"
        >
          <n-icon :component="item.icon" size="25" :depth="1" />
        </router-link>
      </template>
      <span>{{ item.label }}</span>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/userStore'

const permission = useUserStore().permission
</script>

<style scoped lang="less">
.app-sidebar {
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.active {
  background-color: var(--link-color-hover);
}

.app-sidebar-link {
  color: var(--main-color);
  color: var(--link-color);
  margin: 5px 0;
  transition: 0.2s;
  border-radius: 50%;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--link-color-hover);
    i {
      color: var(--link-color-active);
    }
  }
}
</style>
