<template>
  <div style="display: inline-block">
    <span @click="requestModal = true">去申请</span>
    <Dialog v-model="requestModal" title="资产申请" @cancel="resetDialog">
      <div class="df jcsb">
        <n-tree
          style="width: 30%"
          block-line
          :data="treeData"
          expand-on-click
          label-field="name"
          key-field="id"
          selectable
          :on-update:selected-keys="selectNode"
        />
        <section class="modal-section">
          <AssetItem v-for="item in data" :key="item.id" :asset="item" />
        </section>
        <!-- 加载条 -->
        <n-spin />
        <n-pagination
          v-model:page="searchInfo.pageNum"
          v-model:page-size="searchInfo.pageSize"
          :page-count="total"
        >
          <template #prefix> 共{{ total }}项 </template>
        </n-pagination>
      </div>
      <template #footer>
        <div class="df jcsb" id="modal-footer">
          <span> 已选择资产：4 </span>
          <n-button strong secondary type="info" round> 确认 </n-button>
        </div>
        <n-drawer
          v-model:show="drawerVisible"
          :width="200"
          :height="200"
          placement="bottom"
          :trap-focus="false"
          :block-scroll="false"
          to="#modal-footer"
        >
          <n-drawer-content title="已选资产信息">
            《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
          </n-drawer-content>
        </n-drawer>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AssetItem from './AssetItem.vue'
import Dialog from '@/components/Dialog/index.vue'
import { CategoryApi, ICategory } from '@/api/category'
import { AssetsApi, IAsset, IAssetSearch } from '@/api/asset'

const emits = defineEmits(['selectNode'])
const requestModal = ref(false)
const treeData = ref<ICategory[]>([])
const data = ref<IAsset[]>([])
const loading = ref(false)
const total = ref(0)
const searchInfo = ref<IAssetSearch>({
  name: '',
  pageNum: 1,
  pageSize: 10,
})

const useDrawer = () => {
  const drawerVisible = ref(false)
  return { drawerVisible }
}

const { drawerVisible } = useDrawer()

const resetDialog = () => {
  requestModal.value = false
}
const selectNode = (ids: number[]) => {
  emits('selectNode', ids[0] || undefined)
}

const initData = () => {
  loading.value = true
  AssetsApi.getAssets(searchInfo.value)
    .then((res) => {
      data.value = res.data.list
      total.value = res.data.total
    })
    .finally(() => (loading.value = false))
}

initData()

CategoryApi.getCategory(1).then((res) => {
  treeData.value = res.data
})
</script>

<style scoped></style>
