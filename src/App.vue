<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { ElConfigProvider } from 'element-plus'
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
  }
</style>
