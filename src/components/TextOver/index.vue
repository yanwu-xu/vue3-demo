<script setup lang="ts" name="TextOver">
import { ref, watch, nextTick } from 'vue'
const props = withDefaults(defineProps<{
  text: string | number,
  emptyValue: string | number
}>(), {
  text: '',
  emptyValue: '--'
})

const isOver = ref<boolean>(false)
const textWrap = ref(null)

watch(() => props.text, (text, prevText) => {
  nextTick(() => {
    handleOver()
  })
}, {
  immediate: true
})

const handleOver = () => {
  const target = textWrap.value
  const offsetWidth = target.offsetWidth
  const scrollWidth = target.scrollWidth
  isOver.value = scrollWidth > offsetWidth
}
</script>

<template>
  <el-tooltip effect="light" :disabled="!isOver" :content="text" placement="top-start" :open-delay="600"
    :visible-arrow="false">
    <div class="text-wrap" ref="textWrap">
      {{ text || emptyValue }}
    </div>
  </el-tooltip>
</template>


<style scoped lang="scss">
.text-wrap {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>