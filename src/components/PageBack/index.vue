<template>
  <div class="page-back">
    <span class="page-back-inner" @click="goBack">
      <i class="el-icon-back"></i>
      <span class="ml-15">{{ text || '返回' }}</span>
    </span>
  </div>
</template>

<script setup lang="ts" name="PageBack">
import { useAttrs } from 'vue'
import { useRouter } from 'vue-router'

const attrs = useAttrs()
const router = useRouter()
const emit = defineEmits<{
  (event: 'goBack'): void
}>()
defineProps<{
  text: string
}>()

const goBack = () => {
  if (!attrs.goBack || typeof attrs.goBack !== 'function') {
    router.back()
  } else {
    emit('goBack')
  }
}
</script>

<style scoped lang="scss">
.page-back {
  .page-back-inner {
    i {
      font-size: 18px;
      cursor: pointer;
    }

    span {
      font-size: 18px;
      cursor: pointer;
    }

    &:hover {
      i {
        color: $mainColor;
      }

      span {
        color: $mainColor;
      }
    }
  }
}
</style>
