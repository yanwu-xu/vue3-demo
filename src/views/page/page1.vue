<template>
  <div>
    <div
      :style="{
        color: fontColor,
      }"
    >
      {{ count }}--{{ aaa.ddd }}
    </div>
    <div
      :style="{
        color: fontColor,
      }"
    >
      {{ doubleCount }}
    </div>
    <xButton ref="xbtn" @click1="handleAdd" color="blue">加1</xButton>

    <el-text class="mx-1" type="primary">Default</el-text>

    <div class="video">
      <VideoJs />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'page1',
    // 不让子组件的跟节点渲染属性
    inheritAttrs: false,
  })

  import { ref, computed, onMounted, reactive, watch, watchEffect, toRefs } from 'vue'
  import xButton from './xButton.vue'

  const xbtn = ref(null)

  onMounted(() => {
    handleAdd()
  })

  const props = defineProps({
    fontColor: {
      type: String,
      default: 'red',
    },
  })

  const { fontColor } = toRefs(props)

  const emit = defineEmits(['updateCount'])

  const count = ref(0)

  const handleAdd = () => {
    count.value++
    emit('updateCount', count.value)
  }

  const doubleCount = computed(() => {
    return count.value * 2
  })

  const aaa = reactive({ bbb: [0], ccc: 0 })
  watch(
    () => aaa.ccc,
    (old, new1) => {},
    { deep: true }
  )

  setTimeout(() => {
    aaa.bbb = [0, 1]
    aaa.ccc = 2
    aaa.ddd = 'dddd'
  }, 2000)
</script>

<style lang="scss" scoped>
.video {
  width: 640px;
  height: 360px;
}
</style>
