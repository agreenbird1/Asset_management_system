<template>
  <div class="announcement-section">
    <p class="title">{{ announcement?.title }}</p>
    <section class="content">{{ announcement?.content }} —— {{ announcement?.userName }}</section>
    <div v-if="announcement?.picture" style="text-align: center">
      <n-image :src="announcement?.picture" width="280" height="180"></n-image>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AnnouncementApi, IAnnouncement } from '@/api/announcement'
import { ref } from 'vue'

const announcement = ref<IAnnouncement>()

AnnouncementApi.getAnnouncement().then((res) => {
  announcement.value = res.data
  console.log(res.data)
})
</script>

<style scoped lang="less">
.announcement-section {
  margin-top: 20px;
  background-color: var(--projects-section);
  margin-left: 24px;
  border-radius: 15px;
  position: relative;
  padding: 10px;
  overflow: auto;
  width: 360px;
  .title {
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    font-weight: 600;
  }

  .content {
    padding: 10px;
    text-indent: 32px;
  }
}
</style>
