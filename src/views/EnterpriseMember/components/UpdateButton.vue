<template>
  <div class="inline-block">
    <n-button
      color="#6a83d0"
      :disabled="disabled"
      size="small"
      @click="openDialog"
    >
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
        <n-form-item label="昵称" path="userName">
          <n-input
            v-model:value="formValue.userName"
            placeholder="请输入昵称"
          />
        </n-form-item>
        <n-form-item label="手机号" path="phone">
          <n-input v-model:value="formValue.phone" placeholder="请输入手机号" />
        </n-form-item>
        <n-form-item label="部门" path="categoryId">
          <n-tree-select
            :default-value="formValue.categoryId"
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
  </div>
</template>

<script setup lang="ts">
import { CategoryApi, ICategory } from '@/api/category'
import { IUser, UserApi } from '@/api/user'
import Dialog from '@/components/Dialog/index.vue'
import { phoneReg } from '@/config/regExp'
import { sendSingleFile } from '@/utils/uploadFiles'
import { FormInst, FormRules, UploadFileInfo, useMessage } from 'naive-ui'
import { ref, watch } from 'vue'

const emits = defineEmits(['update-user'])
const props = defineProps<{
  user: IUser
  disabled: boolean
}>()

const dialogVisible = ref(false)
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref<Partial<IUser>>({
  ...props.user,
  categoryId: props.user.category?.id,
})
const categories = ref<ICategory[]>()
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
  categoryId: {
    required: true,
    validator: (rule, val, callback) => {
      if (val) return true
      callback('请选择部门')
    },
    trigger: ['change'],
  },
}
const defaultFile = ref([
  {
    id: '1',
    status: 'finished',
    url: formValue.value.avatar,
  },
])

const uploadFiles = (files: UploadFileInfo[]) => {
  files.forEach(async (file) => {
    await sendSingleFile(file)
    formValue.value.avatar = file.url!
  })
}
const openDialog = () => {
  dialogVisible.value = true
  formValue.value = {
    ...props.user,
    categoryId: props.user.category?.id,
  }
  defaultFile.value = [
    {
      id: '1',
      status: 'finished',
      url: formValue.value.avatar,
    },
  ]
  formRef.value?.restoreValidation()
}

const updateAsset = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      UserApi.updateUser(
        {
          ...formValue.value,
          id: undefined,
        },
        formValue.value.id
      ).then(() => {
        message.success('更新成功！')
        emits('update-user')
        dialogVisible.value = false
      })
    }
  })
}

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
