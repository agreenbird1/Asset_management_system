<template>
  <n-button color="#6a83d0" size="small" @click="dialogVisible = true">
    更新
  </n-button>
  <Dialog
    v-model="dialogVisible"
    title="更新资产"
    @confirm="addAsset"
    @cancel="resetForm"
  >
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="资产名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="请输入资产名称" />
      </n-form-item>
      <n-form-item label="规格型号" path="specification">
        <n-input
          v-model:value="formValue.specification"
          placeholder="请输入资产规格型号"
        />
      </n-form-item>
      <n-form-item label="数量" path="quantity">
        <n-input
          v-model:value="formValue.quantity"
          @input="(v:string) => (formValue.quantity = v.replace(/[^0-9]/gi, ''))"
          placeholder="输入数量"
        />
      </n-form-item>
      <n-form-item label="金额" path="amount">
        <n-input v-model:value="formValue.amount" placeholder="输入单个金额" />
      </n-form-item>
      <n-form-item label="存放地点" path="location">
        <n-input
          v-model:value="formValue.location"
          placeholder="输入存放地点"
        />
      </n-form-item>
      <n-form-item label="分类" path="categoryId">
        <n-tree-select
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
          :on-remove="() => (formValue.picture = '')"
        />
      </n-form-item>
    </n-form>
  </Dialog>
</template>

<script setup lang="ts">
import { AssetsApi, IAsset } from '@/api/asset'
import { CategoryApi, ICategory } from '@/api/category'
import Dialog from '@/components/Dialog/index.vue'
import { sendSingleFile } from '@/utils/uploadFiles'
import { FormInst, FormRules, UploadFileInfo, useMessage } from 'naive-ui'
import { ref, watch } from 'vue'

const emits = defineEmits(['add-asset'])
const props = defineProps<{
  asset: IAsset
}>()

const dialogVisible = ref(false)
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref<Partial<IAsset>>({ ...props.asset })
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

const uploadFiles = (files: UploadFileInfo[]) => {
  files.forEach(async (file) => {
    await sendSingleFile(file)
    formValue.value.picture = file.url!
  })
}

const resetForm = () => {
  formValue.value = {
    ...props.asset,
  }
  formRef.value?.restoreValidation()
  dialogVisible.value = false
}

const addAsset = () => {
  console.log(formValue.value)
  formRef.value?.validate((errors) => {
    if (!errors) {
      AssetsApi.createAsset(formValue.value).then(() => {
        message.success('添加成功！')
        emits('add-asset')
        resetForm()
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
