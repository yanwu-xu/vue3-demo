import 'element-plus/dist/index.css'

import { App, Component } from 'vue'

import {
  ElTag,
  ElAffix,
  ElSkeleton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElButtonGroup,
  ElCol,
  ElRow,
  ElSpace,
  ElDivider,
  ElCard,
  ElDropdown,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElPagination,
  ElAlert,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElDescriptions,
  ElDescriptionsItem,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElTreeV2,
  ElText,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElCascader,
  ElTable,
  ElTableColumn,
  ElCheckbox,
  ElConfigProvider,
  // 指令
  ElLoading,
  ElInfiniteScroll
} from 'element-plus'

// Directives
const plugins = [ElLoading, ElInfiniteScroll]

const components = [
  ElTag,
  ElAffix,
  ElSkeleton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElButtonGroup,
  ElCol,
  ElRow,
  ElSpace,
  ElDivider,
  ElCard,
  ElDropdown,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElPagination,
  ElAlert,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElDescriptions,
  ElDescriptionsItem,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElTreeV2,
  ElText,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElCascader,
  ElTable,
  ElTableColumn,
  ElCheckbox,
  ElConfigProvider
]

export function setupElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component((component as any).name, component)
  })
  // 注册指令
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
