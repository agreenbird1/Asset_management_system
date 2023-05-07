<template>
  <div class="enterprise-member">
    <div class="search-header">
      <div>
        <n-input
          v-model:value="searchInfo.userName"
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
        <n-button color="#6a83d0" size="small" @click="initData">
          查询
        </n-button>
      </div>
      <AddMemberButton @add-user="initData" />
    </div>
    <main>
      <ClassifyTree :type="2" title="添加部门分类" @select-node="selectNode" />
      <n-data-table
        class="table"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
        :loading="loading"
        flex-height
        style="height: 100%"
        :remote="true"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import ClassifyTree from '@/components/ClassifyTree/ClassifyTree.vue'
import AddMemberButton from './components/AddMemberButton.vue'
import { IUserSearch, UserApi } from '@/api/user'
import { IUser } from '@/api/user'
import {
  DataTableColumns,
  NButton,
  NImage,
  NSelect,
  PaginationProps,
  useMessage,
} from 'naive-ui'
import { useUserStore } from '@/store/userStore'
import UpdateButton from './components/UpdateButton.vue'

const message = useMessage()
const loading = ref(false)
const userInfo = useUserStore()
const columns = ref<DataTableColumns<IUser>>([
  {
    title: '头像',
    key: 'avatar',
    render(row) {
      return h(NImage, {
        src: row.avatar,
        width: 50,
        height: 50,
        style: 'border-radius:50%',
        objectFit: 'scale-down',
      })
    },
  },
  {
    title: '昵称',
    key: 'userName',
  },
  {
    title: '手机号',
    key: 'phone',
  },
  {
    title: '简介',
    key: 'description',
  },
  {
    title: '角色',
    key: 'role',
    render(row) {
      return h(NSelect, {
        value: row.role,
        options: [
          {
            label: '成员',
            value: 1,
          },
          {
            label: '维修员',
            value: 2,
          },
          {
            label: '管理员',
            value: 3,
          },
          {
            label: '超级管理员',
            value: 4,
            disabled: true,
          },
        ],
        disabled: row.role == 4 || userInfo.userInfo?.id == row.id,
        onUpdateValue(v: 1 | 2) {
          UserApi.changeUserRole(row.id!, v).then(initData)
        },
      })
    },
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
            disabled: row.role == 4 || userInfo.userInfo?.id == row.id,
            onClick() {
              UserApi.changeUserStatus(row.id!, row.status ? 0 : 1).then(() => {
                message.success('更新成功！')
                initData()
              })
            },
          },
          () => (row.status == 0 ? '启用' : '停用')
        ),
        h(UpdateButton, {
          user: row,
          disabled: row.role == 4 && userInfo.userInfo?.id != row.id,
          class: 'ml-5',
          'onUpdate-user': initData,
        }),
      ]
    },
  },
])
const data = ref<IUser[]>([])
const total = ref(0)
const searchInfo = ref<IUserSearch>({
  userName: '',
  phone: '',
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
  UserApi.getUsers(searchInfo.value)
    .then((res) => {
      data.value = res.data.list
      total.value = res.data.total
    })
    .finally(() => (loading.value = false))
}

initData()
</script>

<style scoped lang="less">
.enterprise-member {
  height: 100%;
  display: flex;
  flex-direction: column;

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
    .classify-tree {
      flex: 25%;
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
