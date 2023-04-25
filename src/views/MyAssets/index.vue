<template>
  <div class="my-assets">
    <FilterHeader v-model="searchInfo.myStatus" />
    <main>
      <div class="assets-wrapper">
        <AssetItem v-for="asset in data" :key="asset.id" :asset="asset" />
      </div>
      <footer>
        <n-pagination v-model:page="searchInfo.pageNum" :item-count="total" :page-size="10" />
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import FilterHeader from './components/FilterHeader.vue'
import AssetItem from './components/AssetItem.vue'
import { ref, watch } from 'vue'
import { ApplyApi, IApply, MyAssetStatus } from '@/api/apply'

const searchInfo = ref<{
  myStatus: MyAssetStatus
  pageNum: number
}>({
  myStatus: 1,
  pageNum: 1,
})
const total = ref(0)
const data = ref<IApply[]>([])

const initData = () => {
  const { myStatus, pageNum } = searchInfo.value
  ApplyApi.getMyAssets(myStatus, pageNum).then((res) => {
    total.value = res.data.total
    data.value = res.data.list
  })
}
watch(() => searchInfo.value, initData, { deep: true, immediate: true })
</script>

<style scoped lang="less">
.my-assets {
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin-top: 15px;
    .assets-wrapper {
      height: 442px;
      overflow: auto;
    }
    .asset-item {
      display: inline-block;
      width: 32%;
      margin-right: 2%;
      border-radius: 15px;
      margin-top: 10px;
    }
    .asset-item:nth-child(3n) {
      margin-right: 0;
    }
    footer {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 15px;
    }
  }
}
</style>
