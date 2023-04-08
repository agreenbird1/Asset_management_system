<template>
  <n-card class="asset-item" hoverable>
    <div class="ass-item-wrapper" @click="showAssetDetail = true">
      <img src="@/assets/imgs/太阳.png" width="100" alt="" />
      <section>
        <p class="asset-name">
          <span>无线鼠标</span> <span class="status">在用</span>
        </p>
        <ul>
          <li>资产编码: <span>05010557</span></li>
          <li>规格型号:<span>05010557</span></li>
          <li>管理员:<span>05010557</span></li>
          <li>购买日期:<span>05010557</span></li>
        </ul>
      </section>
    </div>

    <Dialog v-model="showAssetDetail">
      <ul class="detail-list">
        <li><span>资产类别</span><span>资产类别</span></li>
        <li><span>购买日期</span><span>资产类别</span></li>
        <li><span>规格型号</span><span>资产类别</span></li>
        <li><span>数量</span><span>资产类别</span></li>
        <li><span>金额</span><span>资产类别</span></li>
        <li><span>所属公司</span><span>资产类别</span></li>
      </ul>
      <template #footer>
        <HandBackButton />
        <RepairButton />
      </template>
    </Dialog>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import RepairButton from './RepairButton.vue'
import HandBackButton from './HandBackButton.vue'

const showAssetDetail = ref(false)
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
      background: linear-gradient(90deg, #80ddfd, #b3eafc);
      font-size: 12px;
      color: #fff;
      padding: 2px 10px;
      text-align: center;
      height: 20px;
      line-height: 18px;
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
