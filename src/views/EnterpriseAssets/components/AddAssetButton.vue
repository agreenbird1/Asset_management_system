<template>
  <n-button color="#6a83d0" size="small" @click="dialogVisible = true">
    添加资产
  </n-button>
  <Dialog v-model="dialogVisible" title="添加资产">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="规格型号" path="specification">
        <n-input
          v-model:value="formValue.specification"
          placeholder="请输入资产规格型号"
        />
      </n-form-item>
      <n-form-item label="数量" path="number">
        <n-input v-model:value="formValue.number" placeholder="输入数量" />
      </n-form-item>
      <n-form-item label="金额" path="amount">
        <n-input v-model:value="formValue.amount" placeholder="输入单个金额" />
      </n-form-item>
      <n-form-item label="分类" path="classifyId">
        <n-input v-model:value="formValue.classifyId" placeholder="选择分类" />
      </n-form-item>
      <n-form-item label="资产图片" path="cover">
        <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          list-type="image-card"
          :max="1"
        />
      </n-form-item>
    </n-form>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog/index.vue'
import { FormInst } from 'naive-ui'
import { ref } from 'vue'

interface IForm {
  specification: string
  number?: number
  amount?: number
  classifyId?: number
  cover?: string
}

const dialogVisible = ref(false)

const formRef = ref<FormInst | null>(null)
const formValue = ref<IForm>({
  specification: '',
})

const rules = {
  specification: {
    required: true,
    message: '请输入规格',
    trigger: ['input'],
  },
  number: {
    required: true,
    message: '请输入数量',
    trigger: ['input'],
  },
  amount: {
    required: true,
    message: '请输入金额',
    trigger: ['input'],
  },
  classifyId: {
    required: true,
    message: '请选择分类',
    trigger: ['input'],
  },
}
</script>

<style scoped></style>
