<template>
  <div class="announcement-section">
    <h3>公告栏</h3>
    <p class="title">{{ announcement?.title }}</p>
    <section class="content">{{ announcement?.content }}</section>
    <n-image class="content" :src="announcement?.picture"></n-image>
  </div>
</template>

<script setup lang="ts">
import { AnnouncementApi, IAnnouncement } from '@/api/announcement'
import { ref } from 'vue'

const announcement = ref<IAnnouncement>()

AnnouncementApi.getAnnouncement().then((res) => (announcement.value = res.data))
</script>

<style scoped lang="less">
.announcement-section {
  background-color: var(--projects-section);
  margin-left: 24px;
  border-radius: 30px;
  position: relative;
  overflow: auto;
  h3 {
    text-align: right;
  }
}
</style>
