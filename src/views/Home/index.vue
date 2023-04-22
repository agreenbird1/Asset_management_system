<template>
  <div class="app-container">
    <AppHeader />
    <div class="app-content">
      <app-sider />
      <main class="fl1"><router-view></router-view></main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/views/Home/components/AppHeader.vue';
import AppSider from '@/views/Home/components/AppSider.vue';
import { useMessage } from 'naive-ui';

window.$message = useMessage()
</script>

<style scoped lang="less">
.app {
  &-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--app-container);
    transition: 0.2s;
    max-width: 1800px;

    button,
    input,
    optgroup,
    select,
    textarea {
      font-family: 'DM Sans', sans-serif;
    }
  }

  &-content {
    display: flex;
    height: 100%;
    overflow: hidden;
    padding: 16px 24px 24px 0;
  }

  &-icon {
    width: 26px;
    height: 2px;
    border-radius: 4px;
    background-color: var(--main-color);
    position: relative;

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 12px;
      height: 2px;
      border-radius: 4px;
      background-color: var(--main-color);
      left: 50%;
      transform: translatex(-50%);
    }

    &:before {
      top: -6px;
    }

    &:after {
      bottom: -6px;
    }
  }

}


</style>