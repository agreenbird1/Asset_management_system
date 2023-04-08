<template>
  <n-button class="ml-10" color="#6a83d0" @click="repairDialog = true">
    报修
  </n-button>

  <Dialog v-model="repairDialog" title="报修">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <n-form-item label="报修原因" path="reason">
        <n-input
          v-model:value="formValue.reason"
          placeholder="请输入报修原因"
        />
      </n-form-item>
      <n-form-item label="图片" path="picture">
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

const repairDialog = ref(false)
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  reason: '',
  picture: '',
})

const rules = {
  reason: {
    required: true,
    message: '请输入报修原因',
    trigger: ['input'],
  },
}
</script>

<style scoped></style>
