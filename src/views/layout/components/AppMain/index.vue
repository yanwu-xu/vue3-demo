<template>
  <section class="app-main">
    <router-view :key="key" />
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const key = computed(() => {
    return useRoute().fullPath
  })
</script>

<style lang="scss" scoped>
  .app-main {
    flex-grow: 1;
    color: $fontColor;
  }
</style>
