<template>
  <button @click="handleClick" :style="{ color: color }">
    <slot></slot>
  </button>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Button',
    props: {
      color: {
        type: String,
        default: 'yellow',
      },
    },
    emits: ['click1'],
    setup(props, context) {
      const handleClick = () => {
        context.emit('click1')
      }

      return {
        handleClick,
      }
    },
  })
</script>
