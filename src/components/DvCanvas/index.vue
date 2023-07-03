<template>
  <div class="dv-canvas" :style="{ '--bkColor': bkColor }">
    <div
      class="dv-canvas-scale"
      :style="{
        width: clientWidth + 'px',
        height: clientHeight + 'px',
        overflow: mode === 'none' ? 'auto' : 'unset',
      }"
    >
      <div
        class="dv-canvas-transform"
        :style="{
          width: canvasWidth + 'px',
          height: canvasHeight + 'px',
          transform: `scale(${scaleX}, ${scaleY}) translate(${translateX}, ${translateY})`,
          overflow: mode === 'none' ? 'hidden' : 'hidden',
        }"
      >
        <!-- 插槽 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="DvCanvas">
  import { ref, onMounted } from 'vue'

  const $props = withDefaults(
    defineProps<{
      canvasWidth: number
      canvasHeight: number
      bkColor: string
      ignore: Array<{ dom: string }>
    }>(),
    {
      canvasWidth: 1920, // 画布原始宽度（像素值）
      canvasHeight: 1080, // 画布原始高度（像素值）
      bkColor: '', // 背景色
      ignore: () => [],
    }
  )

  const mode = ref<string>('fullscreen')
  const clientWidth = ref<number>(1920)
  const clientHeight = ref<number>(1080)
  const scaleX = ref<number>(1)
  const scaleY = ref<number>(1)
  const translateX = ref<number | string>(0)
  const translateY = ref<number | string>(0)

  onMounted(() => {
    updateScale()
    window.addEventListener('resize', () => {
      updateScale()
    })
  })

  const updateScale = () => {
    _updateClientSize()
    _updateCanvasScale()
  }

  const _updateClientSize = () => {
    clientWidth.value =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    clientHeight.value =
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }

  const _updateCanvasScale = () => {
    if (mode.value === 'none') {
      // 无缩放情况
      scaleX.value = scaleY.value = 1.0
      translateX.value = translateY.value = 0
      clientWidth.value = $props.canvasWidth
      clientHeight.value = $props.canvasHeight
    } else if (mode.value === 'equalratio') {
      _updateCanvasScaleEqualRatio()
    } else {
      // 默认或者异常模式情况下都为全屏缩放。
      _updateCanvasScaleFullScreen()
    }
  }

  const _updateCanvasScaleEqualRatio = () => {
    let canvasRatio = $props.canvasWidth / $props.canvasHeight
    let clientRatio = clientWidth.value / clientHeight.value

    if (canvasRatio > clientRatio) {
      scaleX.value = scaleY.value = clientWidth.value / $props.canvasWidth
      translateX.value = 0
      translateY.value = clientHeight.value / scaleY.value / 2 - $props.canvasHeight / 2
      translateY.value = translateY.value + 'px'
    } else {
      scaleX.value = scaleY.value = clientHeight.value / $props.canvasHeight
      translateX.value = clientWidth.value / scaleX.value / 2 - $props.canvasWidth / 2
      translateX.value = translateX.value + 'px'
      translateY.value = 0
    }
  }

  const _updateCanvasScaleFullScreen = () => {
    translateX.value = translateY.value = 0
    scaleX.value = clientWidth.value / $props.canvasWidth
    scaleY.value = clientHeight.value / $props.canvasHeight
    for (let item of $props.ignore) {
      const ignoreDom = document.querySelector(item.dom) as HTMLElement
      const ignoreDomStyle = ignoreDom.getBoundingClientRect()
      const realScaleX = ignoreDomStyle.width / (ignoreDomStyle.width * scaleX.value)
      const realScaleY = ignoreDomStyle.height / (ignoreDomStyle.height * scaleY.value)
      ignoreDom.style.transform = `scale(${realScaleX}, ${realScaleY})`
    }
  }
</script>

<style scoped lang="scss">
  .dv-canvas {
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: var(--bkColor);
  }

  .dv-canvas-transform {
    transform-origin: 0 0;
  }
</style>
