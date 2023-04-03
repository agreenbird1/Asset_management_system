<template>
  <div class="classification">
    <header class="mb-20">
      <n-button color="#6a83d0" @click="showAddDialog = true"
        >添加分类</n-button
      >
    </header>
    <n-tree
      block-line
      :data="treeData"
      :selectable="false"
      :render-suffix="suffix"
    />
    <Dialog v-model="showAddDialog" title="添加分类"></Dialog>
    <Dialog v-model="showUpdateDialog" title="修改分类"></Dialog>
    <Dialog v-model="showDeleteDialog" title="删除分类"></Dialog>
  </div>
</template>

<script setup lang="ts">
import { NButton, TreeOption } from 'naive-ui'
import { ref, h } from 'vue'
import Dialog from '@/components/Dialog/index.vue'

const showAddDialog = ref(false)
const showUpdateDialog = ref(false)
const showDeleteDialog = ref(false)

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
const suffix = (option: TreeOption) => [
  h(
    NButton,
    {
      text: true,
      type: 'primary',
      color: '#6a83d0',
      onClick: () => (showAddDialog.value = true),
    },
    { default: () => '添加下级' }
  ),
  h(
    NButton,
    {
      text: true,
      type: 'warning',
      class: 'ml-10',
      onClick: () => (showUpdateDialog.value = true),
    },
    { default: () => '修改' }
  ),
  h(
    NButton,
    {
      text: true,
      type: 'error',
      class: 'ml-10',
      onClick: () => (showDeleteDialog.value = true),
    },
    { default: () => '删除' }
  ),
]
</script>

<style scoped lang="less">
.classification {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  header {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
