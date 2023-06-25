<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item :key="item.path" v-if="item.meta.title">
          <span
            v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
            class="no-redirect"
          >
            {{ item.meta.title }}
          </span>
          <component
            :is="item.meta.clickDisabled ? 'span' : 'router-link'"
            v-else
            :to="{ name: item.name }"
          >
            {{ item.meta.title }}
          </component>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const levelList = ref([])

  const getBreadcrumb = (): void => {
    levelList.value = route.matched.filter(item => item?.meta && item?.meta.title !== false)
  }

  getBreadcrumb()

  watch(
    () => route.path,
    () => getBreadcrumb()
  )

  watch(
    () => route.query,
    () => getBreadcrumb()
  )
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    position: relative;
    top: 2px;
    display: inline-block;
    font-size: 14px;
    margin-left: 40px;

    .no-redirect {
      color: #477fe3;
      cursor: text;
    }

    a {
      font-weight: normal;
    }
  }
</style>
