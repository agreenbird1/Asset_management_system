<template>
  <div class="ass-item-wrapper asset-item">
    <img :src="asset.picture" class="mr-10" width="80" height="80" alt="" />
    <section>
      <p class="asset-name">
        <span>{{ asset.name }}</span>
      </p>
      <ul>
        <li>
          资产编码: <span>{{ asset.serialNumber }}</span>
        </li>
        <li>
          规格型号:<span>{{ asset.specification }}</span>
        </li>
        <li>
          存放位置:<span>{{ asset.location }}</span>
        </li>
        <li>
          购买时间:<span>{{
            dayjs(asset.purchaseTime).format('YYYY-MM-DD HH:mm:ss')
          }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { IAsset } from '@/api/asset'
import dayjs from 'dayjs'

interface IAssetProps {
  asset: IAsset
}

const props = defineProps<IAssetProps>()
</script>

<style scoped lang="less">
.ass-item-wrapper {
  border-bottom: 1px solid #eee;
  padding: 5px;
  display: flex;
  cursor: pointer;
  section {
    flex-grow: 1;
    .asset-name {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    li {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
