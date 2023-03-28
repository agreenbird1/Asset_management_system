<template>
  <div class="df h100">
    <div class="projects-section">
      <div class="projects-section-header">
        <p>我的申请</p>
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
          style="height: 100%;"
        />
      </div>
    </div>
    <ProfileSection />
  </div>
</template>

<script setup lang="ts">
import { DataTableColumns, NButton, useMessage } from 'naive-ui'
import { h, reactive, ref } from 'vue'
import ProfileSection from './components/ProfileSection.vue'

const message = useMessage()
const searchInfo = ref({
  pageNum: 1,
  state: 1,
})

const states = [
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
    label: '已签收',
    value: 4,
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
    },{
      title: '申请日期',
      key: 'date',
    },{
      title: '申请状态',
      key: 'state',
    }
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
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      opacity: 0.9;
      margin: 0;
      margin-bottom: 20px;
      color: var(--main-color);
    }
    .state {
      label {
        margin-right: 50px;
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
</style>
