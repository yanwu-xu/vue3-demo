<template>
  <div class="menu-wrapper">
    <template v-for="item in props.routes">
      <template v-if="!item.hidden && item.children">
        <!-- router-link 的 to 参数 需要保持跟 el-menu-item 的 index 一致 -->
        <router-link
          exact
          v-if="
            hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow
          "
          :to="props.subAppName + item.path + '/' + item.children[0].path"
          :key="item.children[0].name"
        >
          <el-menu-item
            :index="props.subAppName + item.path + '/' + item.children[0].path"
            :class="{ 'submenu-title-noDropdown': !props.isNest }"
          >
            <svg-icon
              v-if="item.children[0].meta && item.children[0].meta.icon"
              :icon-class="item.children[0].meta.icon"
              class="icons"
            />
            <template #title>
              <span v-if="item.children[0].meta && item.children[0].meta.newTitle">{{
                item.children[0].meta.newTitle
              }}</span>
            </template>
          </el-menu-item>
        </router-link>
        <el-sub-menu v-else :index="item.name || item.path" :key="item.name">
          <template #title>
            <svg-icon
              v-if="item.meta && item.meta.icon"
              :icon-class="item.meta.icon"
              class="icons"
            />
            <span v-if="item.meta && item.meta.newTitle">{{ item.meta.newTitle }}</span>
          </template>
          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="
                  hasOneShowingChildren(child.children) &&
                  child.children &&
                  child.children.length > 0
                "
                :routes="[child]"
                :key="child.path"
              />
              <router-link
                exact
                v-else
                :to="props.subAppName + item.path + '/' + child.path"
                :key="child.name"
              >
                <el-menu-item :index="subAppName + item.path + '/' + child.path">
                  <svg-icon
                    v-if="child.meta && child.meta.icon"
                    :icon-class="child.meta.icon"
                    class="icons"
                  />
                  <template #title>
                    <span v-if="child.meta && child.meta.newTitle">{{ child.meta.newTitle }}</span>
                  </template>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue'

  function hasOneShowingChildren(children) {
    if (children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
    }
    return false
  }

  const props = defineProps({
    routes: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    subAppName: {
      type: String,
      default: '',
    },
  })
</script>

<style lang="scss" scoped>
  .icons {
    font-size: 16px !important;
  }
</style>
