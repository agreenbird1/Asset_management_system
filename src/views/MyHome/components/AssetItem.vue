<template>
  <div class="ass-item-wrapper asset-item">
    <img src="@/assets/imgs/太阳.png" width="80" height="80" alt="" />
    <section>
      <p class="asset-name">
        <span>无线鼠标</span>
        <span class="status"><n-checkbox size="small" /></span>
      </p>
      <ul>
        <li>资产编码: <span>05010557</span></li>
        <li>规格型号:<span>05010557</span></li>
        <li>管理员:<span>05010557</span></li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

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
