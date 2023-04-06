<template>
  <aside class="classify-tree">
    <n-tree block-line :data="treeData" selectable />
    <div class="button-wrapper mt-30">
      <span class="add-button"> +添加部门分类 </span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    label: '1',
    key: 1,
    children: [
      {
        label: '1-1',
        key: 2,
        level: 2,
      },
      {
        label: '1-2',
        key: 3,
        level: 2,
      },
      {
        label: '1-3',
        key: 4,
        level: 2,
        children: [
          {
            label: '1-3-1',
            key: 5,
            level: 3,
          },
        ],
      },
    ],
    level: 1,
  },
  {
    label: '2',
    key: 6,
    level: 1,
  },
  {
    label: '3',
    key: 7,
    level: 1,
  },
  {
    label: '4',
    key: 8,
    level: 1,
  },
])
</script>

<style scoped lang="less">
.classify-tree {
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
  height: 100%;
  overflow: auto;

  .button-wrapper {
    text-align: center;
  }
  .add-button {
    padding: 5px 10px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
