<template>
  <header class="app-header">
    <div class="app-header-left">
      <img src="@/assets/favicon.ico" alt="" />
      <p class="app-name">固定资产管理</p>
      <div class="search-wrapper">
        <input
          class="search-input"
          type="text"
          @input="e => searchText = (e!.target as HTMLInputElement).value"
          @focus="showOptions = true"
          @blur="showOptions = false"
          placeholder="搜索当前内容"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="feather feather-search"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <ul v-if="showOptions">
          <li
            v-for="route in routes"
            :key="route.route"
            @click="$router.push(route.route)"
          >
            {{ route.label }}
          </li>
        </ul>
      </div>
    </div>
    <div class="app-header-right">
      <NotificationButton />
      <span class="time ml-20">December，26</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import NotificationButton from './NotificationButton.vue'
import { ref, watch } from 'vue'
import { asideAuthority } from '@/config/authority'

const showOptions = ref(false)
const searchText = ref('')
const routes = ref([...asideAuthority])

watch(
  () => searchText.value,
  () => {
    routes.value = asideAuthority.filter((route) =>
      route.label.includes(searchText.value)
    )
  }
)
</script>

<style scoped lang="less">
.app {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 24px;
    position: relative;

    &-left,
    &-right {
      display: flex;
      align-items: center;
    }

    &-left {
      flex-grow: 1;
    }

    &-right button {
      margin-left: 10px;
    }
  }
  &-name {
    color: var(--main-color);
    margin: 0;
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    margin: 0 32px;
  }
}

.mode-switch {
  background-color: transparent;
  border: none;
  margin-right: 10px;
  padding: 0;
  color: var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-wrapper {
  position: relative;
  border-radius: 20px;
  background-color: var(--search-area-bg);
  padding-right: 12px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 480px;
  color: var(--light-font);
  box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2),
    0 24px 20px -24px rgba(71, 82, 107, 0.1);

  .dark & {
    box-shadow: none;
  }
  ul {
    z-index: 9999;
    position: absolute;
    left: 15px;
    top: 40px;
    background-color: #fff;
    width: 94%;
    box-shadow: 3px 2px 2px rgba(71, 82, 107, 0.1);
    color: #8e8d8d;
    li {
      cursor: pointer;
      height: 28px;
      line-height: 28px;
      padding-left: 10px;
      &:hover {
        background-color: var(--more-list-bg-hover);
      }
    }
  }
}

.search-input {
  border: none;
  flex: 1;
  outline: none;
  height: 100%;
  padding: 0 20px;
  font-size: 16px;
  background-color: var(--search-area-bg);
  color: var(--main-color);
  border-radius: 50%;
  &:placeholder {
    color: var(--main-color);
    opacity: 0.6;
  }
}
</style>
