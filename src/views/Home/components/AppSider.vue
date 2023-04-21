<template>
  <div class="app-sidebar">
    <n-popover
      v-for="(item, i) in permissions"
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
import { asideAuthority } from '@/config/authority'
import { useUserStore } from '@/store/userStore'
import { computed } from 'vue'

const userState = useUserStore()
const permissions = computed(() =>
  asideAuthority.filter(
    (permission) => permission.index <= (userState.userInfo?.role || 1)
  )
)
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
