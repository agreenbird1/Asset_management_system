<template>
  <div class="apply-asset">
    <span @click="requestModal = true">去申请</span>
    <Dialog v-model="requestModal" title="资产申请" width="50%">
      <div class="df jcsb" id="apply-asset">
        <n-tree
          style="width: 20%"
          block-line
          :data="treeData"
          expand-on-click
          label-field="name"
          key-field="id"
          selectable
          :on-update:selected-keys="selectNode"
        />
        <!-- 加载条 -->
        <main class="fl1 pl-10">
          <section v-if="data.length" class="modal-section mb-10">
            <div v-for="item in data" :key="item.id" class="item-wrapper">
              <AssetItem :asset="item" />
              <n-checkbox
                :checked="item.checked"
                :on-update:checked="(checked:boolean) => checkAssetItem(item,checked)"
                size="small"
              />
            </div>
          </section>
          <n-empty
            v-else
            style="width: 300px; height: 150px"
            description="暂无可以申请的资产！"
          ></n-empty>
          <n-pagination
            v-if="data.length"
            v-model:page="searchInfo.pageNum"
            :item-count="total"
          >
            <template #prefix> 共{{ total }}项 </template>
          </n-pagination>
        </main>
      </div>
      <template #footer>
        <div class="df jcsb aic w100">
          <span>
            已选择资产：{{ checkedItems.length }}
            <n-button
              quaternary
              round
              size="small"
              color="#6a83d0"
              @click="drawerVisible = true"
            >
              查看
            </n-button>
          </span>
          <n-button strong secondary type="info" round @click="confirmApply">
            确认
          </n-button>
        </div>
      </template>
      <n-drawer
        v-model:show="drawerVisible"
        :width="200"
        :height="200"
        placement="bottom"
        :trap-focus="false"
        :block-scroll="false"
        to="#apply-asset"
      >
        <n-drawer-content title="已选资产信息">
          <div
            v-for="(checkedItem, index) in checkedItems"
            :key="checkedItem.id"
            class="checked-item df jcsb"
          >
            <div>
              <span style="font-size: 16px; margin-right: 10px">
                {{ checkedItem.name }}
              </span>
              <span style="font-size: 12px; color: #aaa">
                {{ checkedItem.specification }}
              </span>
            </div>
            <n-button text type="error" @click="removeCheckedItem(index)">
              移除
            </n-button>
          </div>
        </n-drawer-content>
      </n-drawer>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AssetItem from './AssetItem.vue'
import Dialog from '@/components/Dialog/index.vue'
import { CategoryApi, ICategory } from '@/api/category'
import { AssetsApi, IAsset, IAssetSearch } from '@/api/asset'
import { useMessage } from 'naive-ui'
import { ApplyApi } from '@/api/apply'

interface CheckedAsset extends IAsset {
  checked?: boolean
}

const emits = defineEmits(['flush'])

const message = useMessage()

const requestModal = ref(false)
const treeData = ref<ICategory[]>([])
const data = ref<CheckedAsset[]>([])
const checkedItems = ref<CheckedAsset[]>([])
const total = ref(0)
const searchInfo = ref<IAssetSearch>({
  name: '',
  pageNum: 1,
  pageSize: 10,
  categoryId: undefined,
})

const useDrawer = () => {
  const drawerVisible = ref(false)
  return { drawerVisible }
}

const { drawerVisible } = useDrawer()

const selectNode = (ids: number[]) => {
  searchInfo.value.categoryId = ids[0]
  initData()
}
const checkAssetItem = (item: CheckedAsset, checked: boolean) => {
  if (checkedItems.value.length > 5)
    return message.warning('一次最多申请五件物品！')
  const index = checkedItems.value.findIndex((i) => i.id == item.id)
  item.checked = checked
  if (index == -1) checkedItems.value.push(item)
  else checkedItems.value.splice(index, 1)
}
const removeCheckedItem = (index: number) => {
  checkedItems.value.splice(index, 1)[0].checked = false
  checkedItems.value.length == 0 && (drawerVisible.value = false)
}
const confirmApply = () => {
  if (!checkedItems.value.length) return message.warning('至少选择一件物品！')
  ApplyApi.createApply(checkedItems.value.map((item) => item.id!)).then(
    (res) => {
      if (res.success) {
        message.success('申请成功！')
        checkedItems.value = []
        requestModal.value = false
        emits('flush')
      }
    }
  )
}

const initData = () => {
  // 申请处需要隔离未启用的商品
  AssetsApi.getAssets({ ...searchInfo.value, isApply: true }).then((res) => {
    data.value = res.data.list
    // 翻页重置
    total.value = res.data.total
    data.value.forEach((asset) => {
      const item = checkedItems.value.find(
        (checkedItem) => checkedItem.id == asset.id
      )
      if (item) asset.checked = true
    })
  })
}

watch(() => searchInfo.value.pageNum, initData, { immediate: true })

CategoryApi.getCategory(1).then((res) => {
  treeData.value = res.data
})
</script>

<style scoped lang="less">
.apply-asset {
  display: inline-block;
  height: 30px;
  line-height: 22px;
  width: 80px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid var(--main-color);
  & > span {
    font-size: 16px;
  }
}
main {
  border-left: 1px solid #eee;
  .modal-section {
    height: 350px;
    overflow: auto;
  }
}

.item-wrapper {
  position: relative;
  .n-checkbox {
    position: absolute;
    top: 0;
    right: 10px;
  }
}
</style>
