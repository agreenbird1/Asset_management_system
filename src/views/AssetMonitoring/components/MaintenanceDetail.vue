<template>
  <div class="maintenance-detail">
    <div class="ass-item-wrapper">
      <img :src="monitorDetail?.asset.picture" width="120" height="120" alt="" title="报修图片" />
      <section class="ml-5">
        <ul>
          <li>资产名称: <span>{{ monitorDetail?.asset.name }}</span></li>
          <li>资产编码: <span>{{ monitorDetail?.asset.serialNumber }}</span></li>
          <li>规格型号:<span>{{ monitorDetail?.asset.specification }}</span></li>
          <li>报修人:<span>{{ monitorDetail?.applyUser.userName }}</span></li>
          <li>报修时间:<span>{{ monitorDetail?.createTime }}</span></li>
          <li>报修描述:<span>{{ monitorDetail?.maintenance.description }}</span></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMonitor } from '@/api/monitor';
import { inject, Ref } from 'vue';

const monitorDetail = inject<Ref<IMonitor>>('monitorDetail')
</script >

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
</style>