<template>
  <div class="profile-section">
    <p class="company">RoleTang</p>
    <div class="profile-header df jcsb aic">
      <button class="avatar">
        <img :src="userInfo?.avatar" />
        <span>{{ userInfo?.userName }}</span>
      </button>
      <div class="profile-options df aic">
        <ChangePassword />
        <Logout />
      </div>
    </div>
    <p>中后台项目组</p>
    <p>前端工程师</p>
    <p class="df aic">
      <span>个人简介：</span>
      <div class="fl1">
        <n-input
          v-if="showDescription"
          v-model="description"
          ref="inputRef"
          round
          placeholder="输入简介"
          @blur="changeDescription"
          size="small"
          style="display: inline-block;"
        />
        <span v-else @click="startChangeDescription">
          {{ userInfo?.description || '暂时还没有介绍哦！' }}
        </span>
      </div>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChangePassword from './ChangePassword.vue'
import Logout from './Logout.vue'
import { NInput, useMessage } from 'naive-ui';
import { useUserStore } from '@/store/userStore';
import { UserApi } from '@/api/user';

const userInfo = useUserStore().userInfo
const showDescription = ref(false)
const inputRef = ref<InstanceType<typeof NInput>>()
const description = ref('')

const changeDescription = () => {
  showDescription.value = false
  UserApi.updateUser({description:description.value}).then((res) => {
    res.success && useMessage().success('修改成功！')
  })
}
const startChangeDescription = () => {
  showDescription.value = true
  inputRef.value?.inputElRef?.focus()
}
</script>

<style scoped lang="less">
.profile-section {
  flex-shrink: 0;
  padding-bottom: 32px;
  background-color: var(--projects-section);
  margin-left: 24px;
  flex: 1;
  width: 100%;
  padding: 20px;
  height: 250px;
  border-radius: 30px;
  position: relative;
  overflow: auto;
  transition: all 300ms cubic-bezier(0.19, 1, 0.56, 1);

  .avatar {
    padding: 0;
    border: 0;
    background-color: transparent;
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 4px;
    }

    span {
      color: var(--main-color);
      font-size: 16px;
      line-height: 24px;
    }
  }

  p {
    font-size: 14px;
    margin-top: 5px;
    padding-left: 35px;
    color: #5e5b5b;
  }

  .company {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    padding: 0;
  }
}
</style>
