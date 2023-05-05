<template>
  <div class="inline-block">
    <n-button color="#6a83d0" size="small" @click="openDialog">
      更新
    </n-button>
    <Dialog
      v-model="dialogVisible"
      title="更新资产"
      @confirm="updateAsset"
      @cancel="dialogVisible = false"
    >
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        label-placement="left"
        :rules="rules"
      >
        <n-form-item label="资产名称" path="name">
          <n-input
            v-model:value="formValue.name"
            placeholder="请输入资产名称"
          />
        </n-form-item>
        <n-form-item label="规格型号" path="specification">
          <n-input
            v-model:value="formValue.specification"
            placeholder="请输入资产规格型号"
          />
        </n-form-item>
        <n-form-item label="存放地点" path="location">
          <n-input
            v-model:value="formValue.location"
            placeholder="输入存放地点"
          />
        </n-form-item>
        <n-form-item label="分类" path="categoryId">
          <n-tree-select
            :value="formValue.categoryId"
            :options="categories"
            @update:value="(v: number) => (formValue.categoryId = v)"
            key-field="id"
            label-field="name"
            placeholder="请选择资产分类"
            clearable
          />
        </n-form-item>
        <n-form-item label="资产图片" path="picture">
          <n-upload
            :on-update:file-list="uploadFiles"
            :default-upload="false"
            list-type="image-card"
            :max="1"
            :default-file-list="defaultFile"
            :on-remove="() => (formValue.picture = '')"
          />
        </n-form-item>
      </n-form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { AssetsApi, IAsset } from '@/api/asset'
import { CategoryApi, ICategory } from '@/api/category'
import Dialog from '@/components/Dialog/index.vue'
import { sendSingleFile } from '@/utils/uploadFiles'
import { FormInst, FormRules, UploadFileInfo, useMessage } from 'naive-ui'
import { ref, watch } from 'vue'

const emits = defineEmits(['update-asset'])
const props = defineProps<{
  asset: IAsset
}>()

const dialogVisible = ref(false)
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref<Partial<IAsset>>({
  ...props.asset,
  categoryId: props.asset.category.id,
})
const categories = ref<ICategory[]>()
const rules: FormRules = {
  name: {
    required: true,
    message: '请输入名称',
    trigger: ['blur'],
  },
  specification: {
    required: true,
    message: '请输入规格',
    trigger: ['input'],
  },
  quantity: {
    required: true,
    validator(rule, val, callback) {
      if (!+val) callback('请输入正确的数量')
      return true
    },
    trigger: ['input'],
  },
  amount: {
    required: true,
    message: '请输入金额',
    trigger: ['input'],
  },
  categoryId: {
    required: true,
    validator: (rule, val, callback) => {
      if (val) return true
      callback('请选择分类')
    },
    trigger: ['blur'],
  },
  location: {
    required: true,
    message: '请输入存放位置',
    trigger: ['blur'],
  },
}
const defaultFile = ref([
  {
    id: '1',
    status: 'finished',
    url: formValue.value.picture,
  },
])

const uploadFiles = (files: UploadFileInfo[]) => {
  files.forEach(async (file) => {
    await sendSingleFile(file)
    formValue.value.picture = file.url!
  })
}
const openDialog = () => {
  dialogVisible.value = true
  formValue.value = {
    ...props.asset,
    categoryId: props.asset.category.id,
  }
  defaultFile.value = [
    {
      id: '1',
      status: 'finished',
      url: formValue.value.picture,
    },
  ]
  formRef.value?.restoreValidation()
}

const updateAsset = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      AssetsApi.updateAssetAll(formValue.value).then(() => {
        message.success('更新成功！')
        emits('update-asset')
        dialogVisible.value = false
      })
    }
  })
}

watch(
  () => dialogVisible.value,
  () => {
    dialogVisible.value &&
      CategoryApi.getCategory(1).then((res) => {
        categories.value = res.data
      })
  },
  { immediate: true }
)
</script>

<style scoped></style>
