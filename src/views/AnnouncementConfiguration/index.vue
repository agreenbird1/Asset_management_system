<template>
  <div class="announcement-configuration">
    <div class="button-wrapper">
      <n-button color="#6a83d0" @click="createAnnouncement">保存</n-button>
      <n-button type="error" class="mr-5" @click="dialogVisible = true"
        >清空公告</n-button
      >
    </div>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="公告标题" path="title">
        <n-input v-model:value="formValue.title" placeholder="请输入标题" />
      </n-form-item>
      <n-form-item label="公告内容" path="content">
        <n-input
          v-model:value="formValue.content"
          type="textarea"
          placeholder="请输入内容"
        />
      </n-form-item>

      <n-form-item label="公告配图" path="picture">
        <n-upload
          :on-update:file-list="uploadFiles"
          list-type="image-card"
          :default-upload="false"
          :max="1"
          :on-remove="() => (formValue.picture = '')"
        />
      </n-form-item>
    </n-form>
    <Dialog
      v-model="dialogVisible"
      title="清空公告"
      @cancel="dialogVisible = false"
      @confirm="clearAnnouncement"
    >
      注意，清空公告后成员将不会看到任何公告信息！
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { AnnouncementApi, IAnnouncement } from '@/api/announcement'
import { sendSingleFile } from '@/utils/uploadFiles'
import Dialog from '@/components/Dialog/index.vue'
import { FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import { ref } from 'vue'

const formRef = ref<FormInst | null>(null)
const originValue = {
  title: '',
  content: '',
  picture: '',
}
const formValue = ref<IAnnouncement>({
  ...originValue,
})
const dialogVisible = ref(false)

const rules: FormRules = {
  title: {
    required: true,
    message: '请输入公告标题！',
    trigger: ['blur'],
  },
  content: {
    required: true,
    message: '请输入公告内容！',
    trigger: ['blur'],
  },
}

const uploadFiles = (files: UploadFileInfo[]) => {
  files.forEach(async (file) => {
    await sendSingleFile(file)
    formValue.value.picture = file.url!
  })
}

const createAnnouncement = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      AnnouncementApi.createAnnouncement(formValue.value).then(() => {
        window.$message.success('保存成功！')
        formValue.value = {
          ...originValue,
        }
        formRef.value?.restoreValidation()
      })
    }
  })
}
const clearAnnouncement = () =>
  AnnouncementApi.clear().then(() => {
    window.$message.success('清空成功！')
    dialogVisible.value = false
  })
</script>

<style scoped lang="less">
.announcement-configuration {
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  padding: 20px;
  .button-wrapper {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
  }
}
</style>
