<template>
  <div class="asset-monitoring">
    <div class="search-header">
      <n-input
        v-model:value="searchInfo.applyUserName"
        type="text"
        placeholder="申请人"
        size="small"
        autocomplete="none"
      />
      <n-input
        v-model:value="searchInfo.assetName"
        type="text"
        placeholder="申请人"
        size="small"
        autocomplete="none"
      />
      <n-input
        v-model:value="searchInfo.handleUserName"
        type="text"
        placeholder="员工手机"
        size="small"
        aria-autocomplete="none"
      />
      <n-button color="#6a83d0" size="small"> 查询 </n-button>
    </div>
    <n-data-table
      class="table"
      remote
      :columns="columns"
      :loading="loading"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </div>
</template>

<script setup lang="ts">
import { DataTableColumns, NButton, PaginationProps } from 'naive-ui'
import { h, reactive, ref } from 'vue'

const searchInfo = ref({
  assetName: '',
  applyUserName: '',
  handleUserName: '',
  pageNum: 1,
})

const columns = ref<DataTableColumns>([
  {
    title: '资产名称',
    key: 'asset.name',
  },
  {
    title: '规格型号',
    key: 'asset.specification',
  },
  {
    title: '申请人',
    key: '',
  },
  {
    title: '处理人',
    key: 'asset.specification',
  },
  {
    title: '时间',
    key: 'asset.specification',
  },
  {
    title: '操作',
    key: 'option',
    render() {
      return h(NButton, {}, () => '详情')
    },
  },
])
const data = ref([])
const total = ref(0)
const loading = ref(false)

const pagination = reactive<PaginationProps>({
  page: searchInfo.value.pageNum,
  pageSize: 10,
  onChange: (page: number) => {
    searchInfo.value.pageNum = page
    initData()
  },
  prefix({ itemCount }) {
    return `总数：${itemCount}`
  },
})

const initData = () => {
  // loading.value = true
}
initData()
</script>

<style scoped lang="less">
.asset-monitoring {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search-header {
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  .n-input {
    display: inline-block;
    width: unset;
    margin-right: 10px;
  }
}
.n-data-table {
  flex: 1;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fff;
  padding: 10px;
}
</style>
