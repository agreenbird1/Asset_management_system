<template>
  <div>
    <!--
      默认没有密码
      开始为设置密码
      后续为修改密码
     -->
    <img
      src="@/assets/imgs/修改密码.png"
      title="修改密码"
      class="cp mr-5"
      width="22"
      @click="showDialog = true"
    />
    <Dialog v-model="showDialog" title="修改密码" width="500px">
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        :rules="rules"
        label-placement="left"
      >
        <n-form-item label="姓名" path="user.name">
          <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item label="年龄" path="user.age">
          <n-input v-model:value="formValue.user.age" placeholder="输入年龄" />
        </n-form-item>
        <n-form-item label="电话号码" path="phone">
          <n-input v-model:value="formValue.phone" placeholder="电话号码" />
        </n-form-item>
      </n-form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog/index.vue'
import { FormInst, useMessage } from 'naive-ui'
import { ref } from 'vue'

const showDialog = ref(false)
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  user: {
    name: '',
    age: '',
  },
  phone: '',
})
const rules = {
  user: {
    name: {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
    age: {
      required: true,
      message: '请输入年龄',
      trigger: ['input', 'blur'],
    },
  },
  phone: {
    required: true,
    message: '请输入电话号码',
    trigger: ['input'],
  },
}

const message = useMessage()

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Valid')
    } else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}
</script>

<style scoped></style>
