<template>
  <n-button class="ml-10" color="#6a83d0" @click="repairDialog = true">
    报修
  </n-button>

  <Dialog
    v-model="repairDialog"
    title="报修"
    @cancel="cancel"
    @confirm="confirm"
  >
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="报修原因" path="description">
        <n-input
          v-model:value="formValue.description"
          placeholder="请输入报修原因"
        />
      </n-form-item>
      <n-form-item label="图片" path="picture">
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
import { ApplyApi, IApply } from '@/api/apply'
import Dialog from '@/components/Dialog/index.vue'
import { sendSingleFile } from '@/utils/uploadFiles';
import { FormInst, UploadFileInfo } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps<{
  asset: IApply
}>()
const emits = defineEmits(['flush'])

const repairDialog = ref(false)
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  description: '',
  picture: '',
})

const rules = {
  description: {
    required: true,
    message: '请输入情况描述',
    trigger: ['blur'],
  },
  picture: {
    required: true,
    message: '请上传物品图片',
    trigger: ['change'],
  },
}

const uploadFiles = (files: UploadFileInfo[]) => {
  files.forEach(async (file) => {
    await sendSingleFile(file)
    formValue.value.picture = file.url!
  })
}

const confirm = () => {
  formRef.value?.validate((e) => {
    if (!e) {
      const { description, picture } = formValue.value
      ApplyApi.maintenance(props.asset.id, { description, picture }).then(
        (res) => {
          emits('flush')
          repairDialog.value = false
        }
      )
    }
  })
}
const cancel = () => {
  formValue.value = { description: '', picture: '' }
  repairDialog.value = false
}
</script>

<style scoped></style>
