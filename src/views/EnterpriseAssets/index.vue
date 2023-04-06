<template>
  <main class="enterprise-assets">
    <ClassifyTree />
    <n-data-table
      class="table"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ClassifyTree from './components/ClassifyTree.vue'

const columns = ref([
  {
    title: 'No',
    key: 'no',
  },
  {
    title: 'Title',
    key: 'title',
  },
])
const data = ref([])
const pagination = ref([])

const searchInfo = ref({
  name: '',
  phone: '',
})
</script>

<style scoped lang="less">
.enterprise-assets {
  flex: 1;
  display: flex;
  height: 100%;
  .classify-tree {
    flex: 30%;
    margin-right: 20px;
  }
  .n-data-table {
    border-radius: 15px;
    overflow: hidden;
    background-color: #fff;
    padding: 10px;
  }
}
</style>
