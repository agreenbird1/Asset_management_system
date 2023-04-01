<template>
  <div class="my-assets">
    <FilterHeader />
    <main>
      <AssetItem />
      <AssetItem />
      <AssetItem />
      <AssetItem />
    </main>
    <footer>
      <n-pagination v-model:page="page" :page-count="100" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import FilterHeader from './components/FilterHeader.vue'
import AssetItem from './components/AssetItem.vue'
import { ref } from 'vue'

const page = ref(1)
</script>

<style scoped lang="less">
.my-assets {
  main {
    margin-top: 15px;
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
  }
  footer {
    margin-top: 15px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
