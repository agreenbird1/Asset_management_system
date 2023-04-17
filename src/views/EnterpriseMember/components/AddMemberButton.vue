<template>
  <n-button color="#6a83d0" size="small" @click="dialogVisible = true">
    添加成员
  </n-button>
  <Dialog v-model="dialogVisible" title="添加成员">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="账号" path="account">
        <n-input v-model:value="formValue.account" placeholder="请输入账号" />
      </n-form-item>
      <n-form-item label="昵称" path="userName">
        <n-input v-model:value="formValue.userName" placeholder="请输入昵称" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          v-model:value="formValue.password"
          type="password"
          placeholder="请输入密码"
        />
      </n-form-item>
      <n-form-item label="确认密码" path="rePassword">
        <n-input
          v-model:value="formValue.rePassword"
          placeholder="请再次输入密码"
          type="password"
        />
      </n-form-item>
      <n-form-item label="部门" path="categoryId">
        <n-tree-select
          :options="categories"
          @update:value="(v: number) => (formValue.categoryId = v)"
          key-field="id"
          label-field="name"
          placeholder="请选择部门"
          clearable
        />
      </n-form-item>
      <n-form-item label="简介" path="description">
        <n-input v-model:value="formValue.description" placeholder="" />
      </n-form-item>

      <n-form-item label="头像" path="cover">
        <n-upload
          :on-update:file-list="uploadFiles"
          list-type="image-card"
          :default-upload="false"
          :max="1"
          :on-remove="() => (formValue.src = '')"
        />
      </n-form-item>
    </n-form>
  </Dialog>
</template>

<script setup lang="ts">
import { CategoryApi, ICategory } from '@/api/category'
import Dialog from '@/components/Dialog/index.vue'
import { sendSingleFile } from '@/utils/uploadFiles'
import { FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import { ref, watch } from 'vue'

interface IForm {
  account: string
  userName: string
  password: string
  rePassword: string
  categoryId?: number
  description?: string
  src: string
}

const dialogVisible = ref(false)

const formRef = ref<FormInst | null>(null)
const formValue = ref<IForm>({
  account: '',
  userName: '',
  password: '',
  rePassword: '',
  src: '',
})

const rules: FormRules = {
  account: {
    required: true,
    message: '请输入账号',
    trigger: ['input'],
  },
  userName: {
    required: true,
    message: '请输入昵称',
    trigger: ['input'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur'],
  },
  rePassword: {
    required: true,
    validator: (rule, val, callback) => {
      if (!val) callback('请确认密码')
      if (val && val !== formValue.value.password)
        callback('两次密码输入不一致！')
      return true
    },
    trigger: ['blur'],
  },
  categoryId: {
    required: true,
    validator: (rule, val, callback) => {
      if (val) return true
      callback('请选择部门')
    },
    trigger: ['change'],
  },
}

const categories = ref<ICategory[]>()

const uploadFiles = (files: UploadFileInfo[]) => {
  files.forEach(async (file) => {
    await sendSingleFile(file)
    formValue.value.src = file.url!
  })
}

// 每次打开需要重新进行数据请求，防止有新增
watch(
  () => dialogVisible.value,
  () => {
    dialogVisible.value &&
      CategoryApi.getCategory(2).then((res) => {
        categories.value = res.data
      })
  },
  { immediate: true }
)
</script>
<style scoped></style>
