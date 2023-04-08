<template>
  <div class="enterprise-manage">
    <div class="search-header">
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
    <n-data-table
      class="table"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchInfo = ref({
  phone: '',
  name: '',
})

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
</script>

<style scoped lang="less">

.enterprise-manage{
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
