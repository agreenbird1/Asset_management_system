<template>
  <div class="enterprise-assets">
    <div class="search-header">
      <div>
        <n-input
          v-model:value="searchInfo.name"
          type="text"
          placeholder="员工名字"
          size="small"
          autocomplete="none"
        />
        <n-input
          v-model:value="searchInfo.phone"
          type="text"
          placeholder="员工手机"
          size="small"
          aria-autocomplete="none"
        />
        <n-button color="#6a83d0" size="small"> 查询 </n-button>
      </div>
      <AddAssetButton />
    </div>
    <main>
      <ClassifyTree  :type="1" title="添加资产分类" />
      <n-data-table
        class="table"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ClassifyTree from '@/components/ClassifyTree/ClassifyTree.vue'
import AddAssetButton from './components/AddAssetButton.vue'

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
  height: 100%;
  .search-header {
    padding: 10px;
    background-color: #fff;
    border-radius: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .n-input {
      display: inline-block;
      width: unset;
      margin-right: 10px;
    }
  }

  main {
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
}
</style>
