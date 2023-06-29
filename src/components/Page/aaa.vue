<template>
  <div class="page-wrapper" :class="{
    'page-wrapper--bottom': $slots.bottomFixed,
    'page-wrapper--full': full !== false,
    'page-wrapper--row': row !== false,
    'page-wrapper--hidden': $slots.left || $slots.right
  }">
    <div class="page-container" :style="{ backgroundColor: bgColor }">
      <!-- top预留 -->
      <slot name="top"></slot>

      <!-- 默认 -->
      <slot></slot>

      <!-- 左右布局 -->
      <div v-if="$slots.left || $slots.right" class="page-column" :style="{ height: columnHeight }">
        <!-- 左侧区域 -->
        <el-scrollbar v-if="$slots.left" class="page-scrollbar page-scrollbar--left" :class="{
          'page-scrollbar--disabled': leftAttrs['s-disabled'] === true || leftAttrs['s-disabled'] === ''
        }" :style="{
  width: leftAttrs['s-width'] || '100%',
  backgroundColor: leftAttrs['s-bg-color'] || '#fff',
  padding: `${leftAttrs['s-padding'][0]} 0 ${leftAttrs['s-padding'][2]} ${leftAttrs['s-padding'][3]}`
}" :view-style="{
  paddingRight: leftAttrs['s-padding'][1]
}">
          <slot name="left"></slot>
        </el-scrollbar>

        <!-- 右侧区域 -->
        <el-scrollbar v-if="$slots.right" class="page-scrollbar page-scrollbar--right" :class="{
          'page-scrollbar--disabled': rightAttrs['s-disabled'] === true || rightAttrs['s-disabled'] === ''
        }" :style="{
  width: rightAttrs['s-width'] || '100%',
  marginLeft: rightAttrs['s-margin-left'] || '20px',
  backgroundColor: rightAttrs['s-bg-color'] || '#fff',
  padding: `${rightAttrs['s-padding'][0]} 0 ${rightAttrs['s-padding'][2]} ${rightAttrs['s-padding'][3]}`
}" :view-style="{
  paddingRight: rightAttrs['s-padding'][1]
}">
          <slot name="right"></slot>
        </el-scrollbar>
      </div>

      <div v-if="$slots.search" class="page-search">
        <div :id="id" class="page-search__form"
          :class="{ 'page-search__expand': isExpand, 'page-search__form-hide-label': !showFormLabel }" ref="searchWrap">
          <!-- 查询表单 -->
          <slot name="search"></slot>

          <!-- 搜索条件的展开收起 -->
          <div class="page-search__expand__wrapper" v-if="stretch && $slots.search && showExpandBtn"
            :style="{ left: positionLeft + 'px' }" ref="expandBtn">
            <span @click="isExpand = !isExpand">
              <span>{{ isExpand ? '收起' : '展开' }} </span>
              <i class="btn-icon el-icon-d-arrow-left" :class="isExpand ? 'btn-icon--up' : 'btn-icon--down'"></i>
            </span>
          </div>
        </div>

        <div class="page-search__btns">
          <!-- 页面右上角操作按钮 -->
          <slot name="btns"></slot>
        </div>
      </div>

      <div class="page-search__value" v-if="stretch && $slots.search && showExpandBtn && !isExpand && searchValue.length">
        <span v-for="(item, index) in searchValue" :key="index">
          <span class="page-search__value-item">
            <span>{{ item.label ? `${item.label}：` : '' }}</span>
            <span>{{ item.value }}</span>
          </span>
        </span>
      </div>

      <div v-if="$slots.table" class="page-table" :class="{ 'page-table__height': !tableAutoHeight }">
        <!-- 表格 -->
        <slot name="table"></slot>

        <div class="page-pagination" v-if="pagination">
          <div>
            <slot name="paginationLeft"></slot>
          </div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pagination[props.pageNum || 'pageNum']" :page-sizes="[10, 20, 50, 100]"
            :page-size="pagination[props.pageSize || 'pageSize']" :total="pagination[props.total || 'total']"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>

      <!-- bottom -->
      <slot name="bottom"></slot>

      <!-- bottomFixed -->
      <div v-if="$slots.bottomFixed" class="page-bottom" :class="{ 'page-bottom--small': sidebarOpened }">
        <slot name="bottomFixed"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    pagination: {},
    bgColor: {
      type: String,
      default: '#fff'
    },
    full: {
      type: Boolean,
      default: false
    },
    row: {
      type: Boolean,
      default: false
    },
    bottomFixedHeight: {
      type: [String, Number],
      default: '112px'
    },
    props: {
      type: Object,
      default: () => ({
        pageNum: 'pageNum',
        pageSize: 'pageSize',
        total: 'total'
      })
    },
    columnHeight: {
      type: String,
      default: '100%'
    },
    tableAutoHeight: {
      type: Boolean,
      default: true
    },
    stretch: {
      type: Boolean,
      default: false
    },
    showSearchValue: {
      type: Boolean,
      default: false
    },
    showFormLabel: {
      type: Boolean,
      default: true
    },
    sidebarOpened: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    bottomFixedHeight: {
      handler(newVal) {
        const height = parseFloat(newVal) + 'px'
        document.getElementsByTagName('body')[0].style.setProperty('--bottom-fixed-height', height)
      },
      immediate: true
    },
    isExpand(val) {
      if (!this.stretch) return
      if (this.showExpandBtn && !val) {
        this.reorder()
      } else {
        if (this.formEl) this.formEl.style.height = 'auto'
      }
    }
  },
  data() {
    return {
      orderIndex: 0,
      searchValue: [],
      id: `id_${this._uid}`,
      leftAttrs: {},
      rightAttrs: {},
      formEl: null,
      resizeOb: null,
      showExpandBtn: false,
      isExpand: false,
      positionLeft: 0
    }
  },
  created() {
    const genPadding = sPadding => {
      const [top, right, bottom, left] = sPadding?.split(' ') || []
      return [top, right ?? top, bottom ?? top, left ?? right ?? top]
    }
    this.leftAttrs = this.$slots?.left?.[0]?.data?.attrs || { 's-disabled': false }
    this.rightAttrs = this.$slots?.right?.[0]?.data?.attrs || { 's-disabled': false }
    this.leftAttrs['s-padding'] = genPadding(this.leftAttrs?.['s-padding'])
    this.rightAttrs['s-padding'] = genPadding(this.rightAttrs?.['s-padding'])
  },
  mounted() {
    this.formEl = document.querySelector(`#${this.id} .el-form`)
    if (this.formEl && this.stretch) {
      this.resizeOb = this.genResizeObserver()
      this.resizeOb.observe(this.formEl)
    }
  },
  beforeDestroy() {
    if (this.formEl && this.stretch) {
      this.resizeOb.unobserve(this.formEl)
    }
  },
  methods: {
    genResizeObserver() {
      // 监听dom大小变化
      return new ResizeObserver(entries => {
        for (const entry of entries) {
          switch (entry.target) {
            case this.formEl:
              this.reorder()
              break
          }
        }
      })
    },
    genSearchValue() {
      if (this.showSearchValue === false) return
      this.searchValue = []
      const formItems = this.$slots.search[0].elm.__vue__.$children
      formItems.forEach((item, index) => {
        const label = item.$options.propsData.label
        const value = Array.from(item.$el.getElementsByTagName('input') || [])
          .map(i => i.value)
          .filter(i => i)
          .join(' - ')

        if (value && index > this.orderIndex) this.searchValue.push({ label, value })
      })
    },
    reorder() {
      const formItems = document.querySelectorAll(`#${this.id} .el-form-item`)
      const wrapWidth = document.querySelector(`#${this.id} .el-form`).offsetWidth
      let orderIndex = 0
      let len = formItems.length,
        lastChild = formItems[len - 1],
        { marginRight: lastMarginRight, width: lastWidth, height, marginBottom } = getComputedStyle(lastChild),
        childrenWidth = parseFloat(lastMarginRight) + parseFloat(lastWidth)

      if (!this.isExpand && this.formEl) {
        this.formEl.style.height = parseFloat(height) + parseFloat(marginBottom) + 'px'
      }
      lastChild.style.order = 200

      for (let i = 0; i < len - 1; i++) {
        let formItem = formItems[i]
        let { marginRight, width } = getComputedStyle(formItem)
        childrenWidth += parseFloat(marginRight) + parseFloat(width)
        if (childrenWidth > wrapWidth) {
          formItem.style.order = 300
          this.showExpandBtn = true
        } else {
          this.positionLeft = childrenWidth - 50
          formItem.style.order = i
          orderIndex = i
        }
      }

      this.orderIndex = orderIndex
      this.genSearchValue()
      if (childrenWidth < wrapWidth) {
        this.showExpandBtn = false
      }
    },
    handleSizeChange(val) {
      this.pagination[this.props.pageSize || 'pageSize'] = val
      this.$emit('query')
    },
    handleCurrentChange(val) {
      this.pagination[this.props.pageNum || 'pageNum'] = val
      this.$emit('query')
    }
  }
}
</script>

<style scoped lang="scss">
.page-wrapper {
  height: 100%;
  width: 100%;

  &.page-wrapper--full {
    &>.page-container {
      padding: 0;
    }
  }

  &.page-wrapper--bottom {
    margin-bottom: $bottomFixedHeight;

    &>.page-container {
      height: calc(100% - #{$bottomFixedHeight});
    }

    &.page-wrapper--full {
      margin-bottom: calc(#{$bottomFixedHeight} - #{$containerPadding});
    }
  }

  &.page-wrapper--row {
    &>.page-container {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  &>.page-container {
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .page-column {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-grow: 1;

    .page-scrollbar {
      height: 100%;

      ::v-deep .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      &.page-scrollbar--disabled {
        &> ::v-deep .el-scrollbar__wrap {
          &>.el-scrollbar__view {
            height: 100%;
            overflow: hidden;

            &>div {
              height: 100%;
            }
          }
        }
      }
    }
  }

  .page-search {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    .page-search__form {
      flex-grow: 1;
      transition: all 1s;
      position: relative;

      ::v-deep .el-form {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;

        .el-form-item:last-child {
          padding-right: 50px;
        }
      }

      &.page-search__form-hide-label {
        ::v-deep .el-form {
          .el-form-item__label {
            display: none;
          }
        }
      }

      &.page-search__expand {
        ::v-deep .el-form-item {
          display: inline-block !important;
        }
      }
    }

    .page-search__btns {
      flex-shrink: 0;
    }
  }

  .page-search__expand__wrapper {
    position: absolute;
    top: 5px;
    font-size: 12px;
    transition: all 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .btn-icon {
      margin-right: 5px;
      transition: all 0.3s;
    }

    .btn-icon--up {
      transform: rotate(90deg);
    }

    .btn-icon--down {
      transform: rotate(-90deg);
    }

    &>span {
      height: 18px;
      line-height: 18px;
      color: $mainColor;
      cursor: pointer;
      flex-shrink: 0;

      &:hover {
        color: $mainColor-light9;
      }
    }
  }

  .page-search__value {
    width: 100%;
    color: #7c7d80;
    margin: -18px 0 10px 0;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    z-index: 10;

    .page-search__value-item {
      margin-right: 10px;

      &>span {
        &:nth-child(1) {
          color: #606266;
        }
      }
    }
  }

  .page-table {
    width: 100%;

    .page-pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      font-size: 14px;
      color: #666;
    }

    &.page-table__height {
      flex-grow: 1;
      height: 100px;

      &:has(.page-pagination) {
        padding-bottom: 42px;
      }

      ::v-deep .el-table {
        max-height: 100%;
        display: flex;
        flex-direction: column;

        .el-table__header-wrapper {
          flex-shrink: 0;
        }

        .el-table__body-wrapper {
          flex-grow: 1;
        }
      }
    }
  }

  .page-bottom {
    height: $bottomFixedHeight;
    width: calc(100% - #{$sidebarWidth});
    background: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 0 10px #bcbcbc;
    transition: width 0.28s;
  }

  .page-bottom--small {
    width: calc(100% - #{$sidebarSmallWidth});
  }
}
</style>
