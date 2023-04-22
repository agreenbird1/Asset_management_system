<template>
  <div>
    <!--
      默认没有密码
      开始为设置密码
      后续为修改密码
     -->
    <img src="@/assets/imgs/修改密码.png" title="修改密码" class="cp mr-5" width="22" @click="showDialog = true" />
    <Dialog v-model="showDialog" title="修改密码" width="500px" @cancel="resetForm" @confirm="confirm">
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" label-placement="left">
        <n-form-item label="原始密码" path="password">
          <n-input v-model:value="formValue.password" type="password" placeholder="请输入原始密码" />
        </n-form-item>
        <n-form-item label="新密码" path="newPassword">
          <n-input v-model:value="formValue.newPassword" type="password" placeholder="请输入密码" />
        </n-form-item>
        <n-form-item label="确认新密码" path="rePassword">
          <n-input v-model:value="formValue.rePassword" placeholder="请再次输入密码" type="password" />
        </n-form-item>
      </n-form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { UserApi } from '@/api/user'
import Dialog from '@/components/Dialog/index.vue'
import { useUserStore } from '@/store/userStore'
import { encrypt } from '@/utils/crypto'
import { FormInst, FormRules, useMessage } from 'naive-ui'
import { ref } from 'vue'

const showDialog = ref(false)

const userStore = useUserStore()
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  password: '',
  newPassword: '',
  rePassword: '',
})
const rules: FormRules = {
  password: {
    required: true,
    validator: (rule, val, callback) => {
      if (!val) callback('请输入原始密码')
      if (val.length > 16 || val.length < 6) callback('密码长度在6-16位！')
      return true
    },
    trigger: ['blur'],
  },
  newPassword: {
    required: true,
    validator: (rule, val, callback) => {
      if (!val) callback('请输入新密码')
      if (val.length > 16 || val.length < 6) callback('密码长度在6-16位！')
      return true
    },
    trigger: ['blur'],
  },
  rePassword: {
    required: true,
    validator: (rule, val, callback) => {
      if (!val) callback('请确认新密码')
      if (val && val !== formValue.value.newPassword)
        callback('两次密码输入不一致！')
      return true
    },
    trigger: ['blur'],
  },
}

const message = useMessage()

const resetForm = () => {
  formValue.value.password = ''
  formValue.value.rePassword = ''
  formRef.value?.restoreValidation()
  showDialog.value = false
}

const confirm = () => {
  formRef.value?.validate((errors) => {
    const { userInfo } = userStore
    if (!errors) {
      const newPassword = encrypt(formValue.value.newPassword)
      if (encrypt(formValue.value.password) == userStore.userInfo?.password) {
        UserApi.updateUser({
          password: newPassword,
        }).then(() => {
          message.success('修改成功！')
          resetForm()
          userStore.setUserInfo(userInfo?.phone!, newPassword)
          showDialog.value = false
        })
      } else message.error('原始密码错误！')

    }
  })
}
</script>

<style scoped></style>
