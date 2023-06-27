<template>
  <el-scrollbar>
    <div @click="toggleSideBar" class="box-hamburger">
      <svg-icon
        class="hamburger main-color"
        icon-class="list"
        :class="{ 'is-active': set.sidebarOpened }"
      />
    </div>

    <el-menu
      mode="vertical"
      :options="set.routes"
      :show-timeout="200"
      :collapse="!set.isCollapse"
      background-color="#374151"
      text-color="#fff"
      active-text-color="#fff"
      :default-active="$route.meta.activeMenu || $route.path"
    >
      <sidebar-item :routes="set.routes" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
  import { reactive, computed } from 'vue'
  import { usePermissionStoreHook } from '@/store/modules/permission'
  import { useAppStoreHook } from '@/store/modules/app'
  import SidebarItem from './SidebarItem.vue'

  const set = reactive({
    sidebarOpened: computed(() => {
      return useAppStoreHook().sidebarOpened
    }),
    fullMain: computed(() => {
      return useAppStoreHook().fullMain
    }),
    routes: computed(() => {
      return usePermissionStoreHook().routes
    }),
    isCollapse: computed(() => {
      return !(set.sidebarOpened || set.fullMain)
    }),
  })

  function toggleSideBar() {
    useAppStoreHook().toggleSideBar()
  }
</script>

<style scoped>
  .box-hamburger {
    width: 100%;
    cursor: pointer;
    text-align: center;
    background-color: #435064;
  }

  .hamburger {
    width: 100%;
    display: inline-block;
    cursor: pointer;
    color: #eee;
    font-size: 24px;
    transform: rotate(0deg);
    transition: 0.38s;
    transform-origin: 50% 50%;
  }

  .hamburger.is-active {
    transform: rotate(90deg);
  }
</style>
