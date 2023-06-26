<template>
  <div class="app-wrapper" :class="set.classObj">
    <div class="sidebar-box">
      <sidebar class="sidebar-container" />
    </div>

    <navbar />

    <div class="main-container">
      <app-main v-bind="$attrs" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed } from 'vue'
  import { Navbar, Sidebar, AppMain } from './components'
  import { useAppStoreHook } from '@/store/modules/app'
  import { setType } from './types'

  const set: setType = reactive({
    sidebarOpened: computed(() => {
      return useAppStoreHook().sidebarOpened
    }),

    fullMain: computed(() => {
      return useAppStoreHook().fullMain
    }),

    classObj: computed(() => {
      return {
        hideSidebar: set.sidebarOpened || set.fullMain,
      }
    }),
  })
</script>

<style lang="scss" scoped>
  .app-wrapper {
    &:after {
      content: '';
      display: table;
      clear: both;
    }
    position: relative;
    height: 100%;
    width: 100%;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
