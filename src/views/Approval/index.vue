<template>
  <div class="df h100">
    <div class="projects-section">
      <div class="projects-section-header">
        <div class="state">
          <label>状态：</label>
          <span
            :class="{ active: searchInfo.state == 1 }"
            @click="searchInfo.state = 1"
            >待处理</span
          >
          <span
            :class="{ active: searchInfo.state == 2 }"
            @click="searchInfo.state = 2"
            >已处理</span
          >
        </div>
      </div>
      <div class="table">
        <n-data-table
          :loading="loading"
          :columns="columns"
          :data="data"
          :pagination="pagination"
          flex-height
          style="height: 100%"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataTableColumns, NButton, useMessage } from 'naive-ui'
import { computed, h, reactive, ref, watch } from 'vue'
import { ApplyApi, IApply } from '@/api/apply'
import dayjs from 'dayjs'
import { APPLY_STATUS_MAP } from '@/config/common'
import RejectApply from './components/RejectApply.vue'
import ResolveApply from './components/ResolveApply.vue'

interface ISearchInfo {
  pageNum: number
  state: 1 | 2
}

const message = useMessage()
const searchInfo = ref<ISearchInfo>({
  pageNum: 1,
  state: 1,
})

const data = ref<IApply[]>([])
const loading = ref(false)

const columns = computed<DataTableColumns<IApply>>(() => {
  const columns: DataTableColumns<IApply> = [
    {
      title: '资产/物品',
      key: 'asset.name',
    },
    {
      title: '规格型号',
      key: 'asset.specification',
    },
    {
      title: '申请数量',
      key: 'number',
      render() {
        return h('span', {}, 1)
      },
    },
    {
      title: '申请人',
      key: 'user.userName',
    },
    {
      title: '申请日期',
      key: 'applyTime',
      render(row) {
        return h('span', {}, dayjs(row.applyTime).format('YYYY-MM-DD HH:mm:ss'))
      },
    },
    {
      title: '申请状态',
      key: 'status',
      render: (row) => h('span', {}, APPLY_STATUS_MAP[row.status]),
    },
  ]
  if (searchInfo.value.state == 1) {
    columns.push({
      title: '操作',
      key: 'option',
      render(row) {
        return [
          h(RejectApply, { apply: row, onFlush: initData }),
          h(ResolveApply, { apply: row, onFlush: initData }),
        ]
      },
    })
  } else
    columns.push(
      {
        title: '备注/原因',
        key: 'both',
        render(apply) {
          return h(
            'span',
            {},
            apply.status == 2 ? apply.remark : apply.rejectReason
          )
        },
      },
      {
        title: '处理人',
        key: 'approveUser',
        render(apply) {
          return h(
            'span',
            {},
            apply.approveUser?.userName
          )
        },
      }
    )

  return columns
})
const pagination = reactive({
  page: searchInfo.value.pageNum,
  pageSize: 10,
  onChange: (page: number) => {
    searchInfo.value.pageNum = page
    pagination.page = page
  },
})

const initData = () => {
  loading.value = true
  const { state, pageNum } = searchInfo.value
  ApplyApi.getApprovalApplies(state, pageNum)
    .then((res) => {
      data.value = res.data.list
    })
    .finally(() => (loading.value = false))
}

watch(() => searchInfo.value, initData, { immediate: true, deep: true })
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

.modal-section {
  width: 70%;
  border-left: 1px solid #eee;
  height: 60vh;
  overflow: auto;
}
</style>
