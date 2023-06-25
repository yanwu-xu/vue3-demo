<template>
  <el-tooltip v-if="props.desc" :content="props.desc">
    <component :class="svgClass" :is="props.iconClass" :style="{ fill: props.color }" />
  </el-tooltip>
  <component :class="svgClass" v-else :is="props.iconClass" :style="{ fill: props.color }" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    color: {
      type: String,
      default: '#fff',
    },
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      default: '',
    },
  })

  const svgClass = computed(() => {
    let activeClass = props.active !== false ? 'pointer' : ''

    if (props.className) {
      return `svg-icon ${props.className} ${activeClass}`
    }
    return `svg-icon ${activeClass}`
  })
</script>

<style scoped lang="scss">
  .svg {
    display: inline;
  }

  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }

  .pointer {
    cursor: pointer;
  }
</style>
