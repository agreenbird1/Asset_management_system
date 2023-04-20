<template>
  <n-button color="#6a83d0" size="small" @click="dialogVisible = true">
    添加成员
  </n-button>
  <Dialog
    v-model="dialogVisible"
    title="添加成员"
    @confirm="addMember"
    @cancel="resetForm"
  >
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="昵称" path="userName">
        <n-input v-model:value="formValue.userName" placeholder="请输入昵称" />
      </n-form-item>
      <n-form-item label="手机号" path="phone">
        <n-input v-model:value="formValue.phone" placeholder="请输入手机号" />
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
          :on-remove="() => (formValue.avatar = '')"
        />
      </n-form-item>
    </n-form>
  </Dialog>
</template>

<script setup lang="ts">
import { CategoryApi, ICategory } from '@/api/category'
import { IUser, UserApi } from '@/api/user'
import Dialog from '@/components/Dialog/index.vue'
import { phoneReg } from '@/config/regExp'
import { sendSingleFile } from '@/utils/uploadFiles'
import { FormInst, FormRules, UploadFileInfo, useMessage } from 'naive-ui'
import { ref, watch } from 'vue'

const dialogVisible = ref(false)
const message = useMessage()
const emits = defineEmits(['add-user'])

const formRef = ref<FormInst | null>(null)
const formValue = ref<IUser>({
  userName: '',
  password: '',
  rePassword: '',
  phone: '',
})

const rules: FormRules = {
  phone: {
    required: true,
    validator: (rule, val, callback) => {
      if (!val) callback('请输入手机号')
      if (!phoneReg.test(val)) callback('手机号格式错误！')
      return true
    },
    trigger: ['blur'],
  },
  userName: {
    required: true,
    message: '请输入昵称',
    trigger: ['input'],
  },
  password: {
    required: true,
    validator: (rule, val, callback) => {
      if (!val) callback('请输入密码')
      if (val.length > 16 || val.length < 6) callback('密码长度在6-16位！')
      return true
    },
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
    formValue.value.avatar = file.url!
  })
}

const addMember = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      UserApi.checkRepeatAccount(formValue.value.phone).then((res) => {
        if (res.data) return message.error('手机号重复！')
        UserApi.createUser(formValue.value).then(() => {
          message.success('添加成功！')
          emits('add-user')
          resetForm()
        })
      })
    }
  })
}
const resetForm = () => {
  formValue.value = {
    userName: '',
    password: '',
    rePassword: '',
    avatar: '',
    phone: '',
  }
  formRef.value?.restoreValidation()
  dialogVisible.value = false
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
