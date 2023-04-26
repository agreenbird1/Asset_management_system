<template>
  <n-card class="asset-item" hoverable>
    <div class="ass-item-wrapper">
      <img :src="asset.asset.picture" width="120" height="120" alt="" />
      <section class="ml-5">
        <p class="asset-name">
          <span>{{ asset.asset.name }}</span>
        <div v-if="asset.myStatus == 1">
          <RepairButton :asset="asset" @flush="$emit('flush')" />
          <HandBackButton :asset="asset" @flush="$emit('flush')" />
        </div>
        <div v-if="asset.myStatus == 2" class="status">维修中</div>
        </p>
        <ul>
          <li>资产编码: <span>{{ asset.asset.serialNumber }}</span></li>
          <li>规格型号:<span>{{ asset.asset.specification }}</span></li>
          <li>签收时间:<span>{{ asset.signTime }}</span></li>
          <li v-if="asset.myStatus == 3">退还时间:<span>{{ asset.returnTime }}</span></li>
          <li>处理人:<span>{{ asset.approveUser.userName }}</span></li>
        </ul>
      </section>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { IApply } from '@/api/apply'
import RepairButton from './RepairButton.vue';
import HandBackButton from './HandBackButton.vue';

defineProps<{
  asset: IApply
}>()
defineEmits(['flush'])
</script>

<style scoped lang="less">
.ass-item-wrapper {
  display: flex;
  cursor: pointer;

  section {
    flex-grow: 1;

    .asset-name {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .status {
      background: rgb(241, 176, 55);
      font-size: 12px;
      color: #fff;
      padding: 2px 10px;
      text-align: center;
      height: 20px;
      line-height: 16px;
      border-radius: 20px;
    }

    li {
      display: flex;
      justify-content: space-between;
    }
  }
}

.detail-list {
  width: 100%;

  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    height: 40px;
    line-height: 40px;
  }
}
</style>
