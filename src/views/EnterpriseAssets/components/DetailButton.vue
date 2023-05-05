<template>
  <div class="inline-block">
    <N-button size="small" color="#6a83d0" @click="dialogVisible = true"
      >详情</N-button
    >
    <Dialog
      v-model="dialogVisible"
      title="资产详情"
      :show-default-footer="false"
    >
      <ul class="list">
        <li>
          <span>资产名称：</span> <span>{{ asset.name }}</span>
        </li>
        <li>
          <span>资产规格型号：</span> <span>{{ asset.specification }}</span>
        </li>
        <li>
          <span>资产编码：</span> <span>{{ asset.serialNumber }}</span>
        </li>
        <li>
          <span>购入日期：</span> <span>{{ asset.purchaseTime }}</span>
        </li>
        <li>
          <span>购入数量：</span> <span>{{ asset.quantity }}</span>
        </li>
        <li>
          <span>可用数量：</span> <span>{{ asset.surplusQuantity }}</span>
        </li>
        <li>
          <span>单价：</span> <span>{{ asset.amount }}</span>
        </li>
        <li>
          <span>存放位置：</span> <span>{{ asset.location }}</span>
        </li>
        <li>
          <span>当前状态：</span>
          <span>{{ asset.status ? '可用' : '不可用' }}</span>
        </li>
        <li>
          <span>使用次数：</span> <span>{{ asset.useTimes }}</span>
        </li>
        <li>
          <span>维修次数：</span> <span>{{ asset.maintenanceNumber }}</span>
        </li>
        <li>
          <span>维修造成损失：</span> <span>{{ asset.maintenanceValue }}</span>
        </li>
        <li>
          <span>报废数量：</span> <span>{{ asset.scrapNumber }}</span>
        </li>
        <li>
          <span>报废价值：</span> <span>{{ asset.scrapValue }}</span>
        </li>
        <li>
          <span>购入时总价：</span> <span>{{ asset.currentValue }}</span>
        </li>
        <li>
          <span>折旧：</span> <span>{{ asset.depreciationValue }}</span>
        </li>
      </ul>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { IAsset } from '@/api/asset'
import Dialog from '@/components/Dialog/index.vue'
import { ref } from 'vue'

const props = defineProps<{
  asset: IAsset
}>()

console.log(props.asset)

const dialogVisible = ref(false)
</script>

<style scoped lang="less">
.list {
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
