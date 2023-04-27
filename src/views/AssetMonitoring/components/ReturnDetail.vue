<template>
  <div class="return-detail">

  </div>
</template>

<script setup lang="ts">
import { IMonitor } from '@/api/monitor';
import { inject, Ref } from 'vue';

const monitorDetail = inject<Ref<IMonitor>>('monitorDetail')
</script>

<style scoped>

</style>