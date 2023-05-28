<template>
  <div class="asset-monitoring">
    <router-view></router-view>
    <div class="search-header">
      <n-input
        v-model:value="searchInfo.applyUserName"
        type="text"
        placeholder="申请人"
        size="small"
        autocomplete="none"
      />
      <n-input
        v-model:value="searchInfo.handleUserName"
        type="text"
        placeholder="处理人"
        size="small"
        aria-autocomplete="none"
      />
      <n-input
        v-model:value="searchInfo.assetName"
        type="text"
        placeholder="资产名称"
        size="small"
        autocomplete="none"
      />
      <n-select
        size="small"
        class="select"
        placeholder="操作类型"
        v-model:value="searchInfo.type"
        :options="options"
        clearable
      />
      <n-button color="#6a83d0" size="small" @click="initData"> 查询 </n-button>
      <n-button
        color="#6a83d0"
        class="ml-5"
        size="small"
        @click="$router.push({ name: 'Statistics' })"
      >
        统计
      </n-button>
    </div>
    <n-data-table
      class="table"
      remote
      :columns="columns"
      :loading="loading"
      :data="data"
      :pagination="pagination"
      :bordered="false"
      flex-height
    />
    <Dialog v-model="detailVisible" title="详情">
      <!-- type: 1 | 2 | 3 | 4 | 5 // 新增 领用 维修 退还 报废 -->
      <AddDetail v-if="monitorDetail?.type == 1" />
      <ApplyDetail v-if="monitorDetail?.type == 2" />
      <MaintenanceDetail v-if="monitorDetail?.type == 3" />
      <ReturnDetail v-if="monitorDetail?.type == 4" />
      <ScrapDetail v-if="monitorDetail?.type == 5" />
      <template #footer> <div></div> </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import MonitorApi, { IMonitor, IMonitorSearch } from '@/api/monitor'
import { MONITOR_TYPE } from '@/config/common'
import dayjs from 'dayjs'
import Dialog from '@/components/Dialog/index.vue'
import { DataTableColumns, NButton, PaginationProps } from 'naive-ui'
import { h, provide, reactive, ref } from 'vue'
import AddDetail from './components/AddDetail.vue'
import ApplyDetail from './components/ApplyDetail.vue'
import MaintenanceDetail from './components/MaintenanceDetail.vue'
import ReturnDetail from './components/ReturnDetail.vue'
import ScrapDetail from './components/ScrapDetail.vue'

const searchInfo = ref<IMonitorSearch>({
  assetName: '',
  applyUserName: '',
  handleUserName: '',
  pageNum: 1,
  type: undefined,
})
const detailVisible = ref(false)
const monitorDetail = ref<IMonitor>()
provide('monitorDetail', monitorDetail)
const options: object[] = []
for (const key in MONITOR_TYPE) {
  if (Object.prototype.hasOwnProperty.call(MONITOR_TYPE, key)) {
    const element = (MONITOR_TYPE as any)[key]
    options.push({
      value: key,
      label: element,
    })
  }
}

const columns = ref<DataTableColumns<IMonitor>>([
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
    key: 'applyUser.userName',
  },
  {
    title: '处理人',
    key: 'handleUser.userName',
  },
  {
    title: '时间',
    key: 'createTime',
    render(row) {
      return h('span', {}, dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss'))
    },
  },
  {
    title: '操作类型',
    key: 'opration',
    render(row) {
      return h('span', {}, MONITOR_TYPE[row.type])
    },
  },
  {
    title: '操作',
    key: 'option',
    render(row) {
      return h(
        NButton,
        {
          color: '#6a83d0',
          size: 'small',
          onClick: () => {
            monitorDetail.value = row
            detailVisible.value = true
          },
        },
        () => '详情'
      )
    },
  },
])
const data = ref<IMonitor[]>([])
const loading = ref(false)

const pagination = reactive<PaginationProps>({
  page: searchInfo.value.pageNum,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    searchInfo.value.pageNum = page
    initData()
  },
  prefix({ itemCount }) {
    return `总数：${itemCount}`
  },
})

const initData = () => {
  loading.value = true
  MonitorApi.get(searchInfo.value)
    .then((res) => {
      pagination.itemCount = res.data.total
      data.value = res.data.list
      pagination.page = searchInfo.value.pageNum
    })
    .finally(() => (loading.value = false))
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
  display: flex;
  .n-input {
    display: inline-block;
    width: unset;
    margin-right: 10px;
  }
  .n-select {
    display: inline-block;
    width: 200px;
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
