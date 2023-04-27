<template>
  <header>
    <div class="header-info df aic jcsb">
      <div>当前资产数量：<span class="num">4</span></div>
    </div>
    <div class="filter-item-list">
      <div
        class="filter-item"
        v-for="option in filterOptions"
        :key="option.value"
        :class="{ active: option.value == myStatus }"
        @click="myStatus = option.value"
      >
        <div class="df aic">
          <n-icon class="mr-5" size="24" :color="option.iconColor">
            <component :is="option.icon" />
          </n-icon>
          <span>
            {{ option.label }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { CheckmarkSharp, Hammer, HourglassOutline } from '@vicons/ionicons5'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: number
}>()
const emits = defineEmits(['update:modelValue'])

const filterOptions = [
  {
    icon: CheckmarkSharp,
    label: '正常资产',
    value: 1,
    iconColor: 'lightgreen',
  },
  {
    icon: Hammer,
    label: '维修中',
    value: 2,
    iconColor: '#fa8a2f',
  },
  {
    icon: HourglassOutline,
    label: '已退还',
    value: 3,
    iconColor: '#a0a7bb',
  },
  {
    icon: HourglassOutline,
    label: '已报废',
    value: 4,
    iconColor: '#a0a7bb',
  },
]

const myStatus = useVModel(props, 'modelValue', emits)
</script>

<style scoped lang="less">
header {
  background-color: #fff;
  border-radius: 15px;
  padding: 10px 20px;
  .header-info {
    font-size: 18px;
    .num {
      color: #6a83d0;
      font-size: 26px;
    }
  }
  .filter-item-list {
    display: flex;
    margin-top: 5px;
    .filter-item {
      display: flex;
      align-items: center;

      margin-left: 20px;
      padding: 5px 15px;
      border-radius: 5px;
      font-size: 16px;
      color: #8091ad;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      div {
        margin-right: 25px;
      }
      & > span {
        color: #0b0a0a;
        font-size: 20px;
      }
    }
    .active {
      color: #fff;
      background-color: var(--main-color);
      & > span {
        color: #fff;
      }
    }
    & .filter-item:first-child {
      margin-left: 0;
    }
  }
}
</style>
