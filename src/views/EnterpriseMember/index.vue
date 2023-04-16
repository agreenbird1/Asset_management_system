<template>
  <div class="enterprise-member">
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
      <AddMemberButton />
    </div>
    <main>
      <ClassifyTree :type="2" title="添加部门分类" />
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
import AddMemberButton from './components/AddMemberButton.vue'

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
