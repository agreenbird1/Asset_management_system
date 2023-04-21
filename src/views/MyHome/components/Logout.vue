<template>
  <div>
    <img
      @click="showDialog = true"
      src="@/assets/imgs/退出.png"
      title="退出"
      class="cp"
      width="25"
    />
    <Dialog
      v-model="showDialog"
      title="退出登录"
      width="500px"
      @cancel="showDialog = false"
      @confirm="logout"
    >
      退出登录后需要重新登录，确认退出登录吗？
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog/index.vue'
import { useUserStore } from '@/store/userStore'
import storage from '@/utils/storage'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showDialog = ref(false)
const userStore = useUserStore()
const router = useRouter()
const logout = () => {
  userStore.$reset()
  storage.deleteSession('userState')
  router.push({ name: 'Login' })
}
</script>

<style scoped></style>
