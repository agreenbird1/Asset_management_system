<template>
  <n-card class="asset-item" hoverable>
    <div class="ass-item-wrapper" @click="openAssetDetail">
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
      <n-modal v-model:show="showModal">
        <n-card
          style="width: 600px"
          title="模态框"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <template #header-extra> 噢！ </template>
          内容
          <template #footer> 尾部 </template>
        </n-card>
      </n-modal>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)

const openAssetDetail = () => {
  showModal.value = true
}
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
</style>
