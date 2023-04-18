<template>
  <div class="df h100">
    <div class="projects-section">
      <div class="projects-section-header">
        <p>我的申请 <span @click="requestModal = true">去申请</span></p>
        <div class="state">
          <label>状态：</label>
          <span
            v-for="s in states"
            :key="s.value"
            :class="{ active: searchInfo.state == s.value }"
            @click="searchInfo.state = s.value"
            >{{ s.label }}</span
          >
        </div>
      </div>
      <div class="table">
        <n-data-table
          :columns="columns"
          :data="data"
          :pagination="pagination"
          flex-height
          style="height: 100%"
        />
      </div>
    </div>
    <ProfileSection />

    <Dialog v-model="requestModal" title="资产申请">
      <div class="df jcsb">
        <n-tree
          style="width: 30%"
          block-line
          :data="treeData"
          expand-on-click
          selectable
        />
        <section class="modal-section">
          <AssetItem />
          <AssetItem />
          <AssetItem />
          <AssetItem />
          <AssetItem />
        </section>
      </div>
      <template #footer>
        <div class="modal-footer df jcsb">
          <span> 已选择资产：4 </span>
          <n-button strong secondary type="info" round> 确认 </n-button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { DataTableColumns, NButton, useMessage } from 'naive-ui'
import { h, reactive, ref } from 'vue'
import ProfileSection from './components/ProfileSection.vue'
import { TreeOption } from 'naive-ui'
import AssetItem from './components/AssetItem.vue'
import Dialog from '@/components/Dialog/index.vue'

type StateValue = 1 | 2 | 3 | 4 | 5

type StateItem = {
  label: string
  value: StateValue
}

type SearchInfo = {
  pageNum: number
  pageSize?: number
  state?: StateValue
}

const message = useMessage()
const searchInfo = ref<SearchInfo>({
  pageNum: 1,
})

const states: StateItem[] = [
  {
    label: '审批中',
    value: 1,
  },
  {
    label: '已批准',
    value: 2,
  },
  {
    label: '已驳回',
    value: 3,
  },
  {
    label: '待签收',
    value: 4,
  },
  {
    label: '已签收',
    value: 5,
  },
]

type Song = {
  no: number
  title: string
  length: string
}

const createColumns = ({
  play,
}: {
  play: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: '资产/物品',
      key: 'no',
    },
    {
      title: '规格型号',
      key: 'title',
    },
    {
      title: '申请数量',
      key: 'length',
    },
    {
      title: '申请日期',
      key: 'date',
    },
    {
      title: '申请状态',
      key: 'state',
    },
  ]
}

const data: Song[] = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
]

const columns = createColumns({
  play(row: Song) {
    message.info(`Play ${row.title}`)
  },
})
const pagination = reactive({
  page: 2,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  onChange: (page: number) => {
    searchInfo.value.pageNum = page
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  },
})

const requestModal = ref(false)
const treeData = ref<TreeOption[]>([
  {
    label: 'data1',
    key: 1,
    value: 1,
  },
  {
    label: 'data2',
    key: 2,
    value: 2,
  },
])
</script>

<style scoped lang="less">
.projects-section {
  flex: 2;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-header {
    margin-bottom: 24px;
    color: var(--main-color);
    border-radius: 15px;
    padding: 10px 20px;
    background-color: var(--projects-section);
    p {
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      opacity: 0.9;
      margin: 0;
      margin-bottom: 20px;
      color: var(--main-color);
      span {
        display: inline-block;
        height: 24px;
        font-size: 14px;
        padding: 0 10px;
        line-height: 24px;
        border: 1px solid var(--main-color);
        font-weight: normal;
        cursor: pointer;
        border-radius: 5px;
      }
    }
    .state {
      label {
        margin-right: 40px;
        font-weight: 600;
      }
      span {
        font-size: 16px;
        font-weight: 300;
        border-radius: 20px;
        padding: 4px 20px;
        display: inline-block;
        cursor: pointer;
        margin-right: 20px;
      }
      .active {
        background: var(--link-color-hover);
        color: #ffffff;
      }
    }
  }
  .table {
    padding: 10px 20px;
    flex: 1;
    background-color: #fff;
    border-radius: 15px;
  }
}

.project-box {
  --main-color-card: #dbf6fd;
  border-radius: 30px;
  padding: 16px;
  background-color: var(--main-color-card);

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    color: var(--main-color);

    span {
      color: #4a4a4a;
      opacity: 0.7;
      font-size: 14px;
      line-height: 16px;
    }
  }

  &-content-header {
    text-align: center;
    margin-bottom: 16px;

    p {
      margin: 0;
    }
  }

  &-wrapper {
    padding: 8px;
    transition: 0.2s;
  }
}

.modal-section {
  width: 70%;
  border-left: 1px solid #eee;
  height: 60vh;
  overflow: auto;
}
</style>
