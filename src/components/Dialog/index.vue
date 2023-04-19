<template>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card
      :style="{
        width,
      }"
      :title="title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      :mask-closable="false"
    >
      <template #header-extra>
        <n-icon
          class="cp"
          size="20"
          @click="closeModal"
          :component="Close"
        ></n-icon>
      </template>
      <!-- 默认 -->
      <slot></slot>
      <template #footer>
        <!-- 底部，具有默认的确认失败按钮。外部传入时候会顶替原有 footer slot 内容 -->
        <div class="default-footer">
          <slot name="footer">
            <n-button class="ml-10" color="#6a83d0" @click="emits('confirm')">
              确认
            </n-button>
            <n-button color="#909399" @click="emits('cancel')"> 取消 </n-button>
          </slot>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { Close } from '@vicons/ionicons5'
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    title?: string
    width?: string
    modelValue: boolean
  }>(),
  {
    width: '700px',
  }
)
const emits = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

const showModal = useVModel(props, 'modelValue', emits)
const closeModal = () => {
  showModal.value = false
  emits('close')
}
</script>

<style scoped lang="less">
.default-footer {
  display: flex;
  flex-direction: row-reverse;
}
</style>
