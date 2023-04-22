<template>
  <div class="enterprise-assets">
    <div class="search-header">
      <div>
        <n-input
          v-model:value="searchInfo.name"
          type="text"
          placeholder="资产名称"
          size="small"
          autocomplete="none"
        />
        <n-button color="#6a83d0" size="small" @click="initData"> 查询 </n-button>
      </div>
      <AddAssetButton @add-asset="initData" />
    </div>
    <main>
      <ClassifyTree :type="1" title="添加资产分类" @select-node="selectNode" />
      <n-data-table
        class="table"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :loading="loading"
        :bordered="false"
        flex-height
        style="height: 100%"
        :remote="true"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import ClassifyTree from '@/components/ClassifyTree/ClassifyTree.vue'
import AddAssetButton from './components/AddAssetButton.vue'
import {
  DataTableColumns,
  NButton,
  NImage,
  PaginationProps,
  useMessage,
} from 'naive-ui'
import { AssetsApi, IAsset, IAssetSearch } from '@/api/asset'

const message = useMessage()
const columns = ref<DataTableColumns<IAsset>>([
  {
    title: '资产名称',
    key: 'name',
  },
  {
    title: '资产图片',
    key: 'picture',
    render(row) {
      return h(NImage, {
        src: row.picture,
        width: 50,
        height: 50,
      })
    },
  },

  {
    title: '规格型号',
    key: 'specification',
  },
  {
    title: '数量',
    key: 'quantity',
  },
  {
    title: '单价',
    key: 'amount',
  },
  {
    title: '存放位置',
    key: 'location',
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            secondary: true,
            color: row.status == 0 ? '#6a83d0' : 'red',
            onClick() {
              AssetsApi.changeAssetStatus(row.id!, row.status ? 0 : 1).then(
                () => {
                  message.success('更新成功！')
                }
              )
            },
          },
          () => (row.status == 0 ? '启用' : '停用')
        ),
      ]
    },
  },
])

const data = ref<IAsset[]>([])
const loading = ref(false)
const total = ref(0)
const searchInfo = ref<IAssetSearch>({
  name: '',
  pageNum: 1,
  pageSize: 10,
})
const pagination = computed<PaginationProps>(() => ({
  page: searchInfo.value.pageNum,
  pageSize: searchInfo.value.pageSize,
  showSizePicker: true,
  pageSizes: [10, 20],
  itemCount: total.value,

  onChange: (page: number) => {
    searchInfo.value.pageNum = page
    initData()
  },
  onUpdatePageSize: (pageSize: number) => {
    searchInfo.value.pageSize = pageSize
    searchInfo.value.pageNum = 1
    initData()
  },
  prefix({ itemCount }) {
    return `总数：${itemCount}`
  },
}))

const selectNode = (id?: number) => {
  searchInfo.value.categoryId = id
  initData()
}

const initData = () => {
  loading.value = true
  AssetsApi.getAssets(searchInfo.value)
    .then((res) => {
      data.value = res.data.list
      total.value = res.data.total
    })
    .finally(() => (loading.value = false))
}

initData()
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
