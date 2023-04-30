<template>
  <div class="app-sidebar">
    <router-link
      v-for="(item, i) in permissions"
      :key="i"
      :to="{ path: item.route }"
      class="app-sidebar-link"
      :class="{ active: $route.path == item.route }"
    >
      <div class="df w100">
        <n-icon :component="item.icon" size="25" :depth="1" />
        <span class="ml-5">{{ item.label }}</span>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { asideAuthority } from '@/config/authority'
import { useUserStore } from '@/store/userStore'
import { computed } from 'vue'

const userState = useUserStore()
const permissions = computed(() =>
  asideAuthority.filter((permission) =>
    permission.index.includes(userState.userInfo?.role || 1)
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
  background-color: var(--link-color-hover) !important;
}

.app-sidebar-link {
  color: var(--main-color);
  color: var(--link-color);
  margin: 5px 0;
  transition: 0.2s;
  border-radius: 10px;
  background-color: #fff;
  flex-shrink: 0;
  width: 150px;
  height: 40px;
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--link-color-hover);
    color: #fff;
    i {
      color: var(--link-color-active);
    }
  }
}
</style>
