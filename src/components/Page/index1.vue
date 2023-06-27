<template>
  <div
    class="page-wrapper"
    :class="{
      'page-wrapper--bottom': $slots.bottomFixed,
      'page-wrapper--full': full !== false,
      'page-wrapper--row': row !== false,
      'page-wrapper--hidden': $slots.left || $slots.right,
    }"
  >
    <div class="page-container" :style="{ backgroundColor: bgColor }">
      <!-- top预留 -->
      <slot name="top"></slot>

      <!-- 默认 -->
      <slot></slot>

      <!-- 左右布局 -->
      <div v-if="$slots.left || $slots.right" class="page-column" :style="{ height: columnHeight }">
        <!-- 左侧区域 -->
        <el-scrollbar
          v-if="$slots.left"
          class="page-scrollbar page-scrollbar--left"
          :class="{
            'page-scrollbar--disabled':
              leftAttrs['s-disabled'] === true || leftAttrs['s-disabled'] === '',
          }"
          :style="{
            width: leftAttrs['s-width'] || '100%',
            backgroundColor: leftAttrs['s-bg-color'] || '#fff',
            padding: `${leftAttrs['s-padding'][0]} 0 ${leftAttrs['s-padding'][2]} ${leftAttrs['s-padding'][3]}`,
          }"
          :view-style="{
            paddingRight: leftAttrs['s-padding'][1],
          }"
        >
          <slot name="left"></slot>
        </el-scrollbar>

        <!-- 右侧区域 -->
        <el-scrollbar
          v-if="$slots.right"
          class="page-scrollbar page-scrollbar--right"
          :class="{
            'page-scrollbar--disabled':
              rightAttrs['s-disabled'] === true || rightAttrs['s-disabled'] === '',
          }"
          :style="{
            width: rightAttrs['s-width'] || '100%',
            marginLeft: rightAttrs['s-margin-left'] || '20px',
            backgroundColor: rightAttrs['s-bg-color'] || '#fff',
            padding: `${rightAttrs['s-padding'][0]} 0 ${rightAttrs['s-padding'][2]} ${rightAttrs['s-padding'][3]}`,
          }"
          :view-style="{
            paddingRight: rightAttrs['s-padding'][1],
          }"
        >
          <slot name="right"></slot>
        </el-scrollbar>
      </div>

      <div v-if="$slots.search" :id="id" class="page-search">
        <div
          class="page-search__form"
          :class="{ 'page-search__expand': isExpand }"
          ref="searchWrap"
        >
          <!-- 查询表单 -->
          <slot name="search"></slot>

          <!-- 搜索条件的展开收起 -->
          <div
            class="page-search__expand__wrapper"
            v-if="stretch && $slots.search && showExpandBtn"
            :style="{ left: positionLeft + 'px' }"
            ref="expandBtn"
          >
            <span @click="isExpand = !isExpand">
              <span>{{ isExpand ? upText : downText }} </span>
              <i
                class="btn-icon el-icon-d-arrow-left"
                :class="isExpand ? 'btn-icon--up' : 'btn-icon--down'"
              ></i>
            </span>
          </div>
        </div>

        <div class="page-search__btns">
          <!-- 页面右上角操作按钮 -->
          <slot name="btns"></slot>
        </div>
      </div>

      <div
        class="page-search__value"
        v-if="stretch && $slots.search && searchValue.length && showSearchValue"
      >
        <span>检索项：</span>
        <span class="page-search__value-item" v-for="(item, index) in searchValue" :key="index">
          <span>{{ item.label ? `${item.label}：` : '' }}</span>
          <span>{{ item.value }}</span>
          <i class="el-icon-error" @click="handleDeleteTag(item, index)"></i>
        </span>
      </div>

      <div
        v-if="$slots.table"
        class="page-table"
        :class="{ 'page-table__height': !tableAutoHeight }"
      >
        <!-- 表格 -->
        <slot name="table"></slot>

        <div class="page-pagination" v-if="pagination">
          <div>
            <slot name="paginationLeft"></slot>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination[props.pageNum || 'pageNum']"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagination[props.pageSize || 'pageSize']"
            :total="pagination[props.total || 'total']"
            layout="total, sizes, prev, pager, next, jumper"
          />
        </div>
      </div>

      <!-- bottom -->
      <slot name="bottom"></slot>

      <!-- bottomFixed -->
      <div
        v-if="$slots.bottomFixed"
        class="page-bottom"
        :class="{ 'page-bottom--small': sidebarOpened }"
      >
        <slot name="bottomFixed"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onCreated, reactive, watch, watchEffect } from 'vue'

  const props = defineProps({
    pagination: {
      type: Object,
    },
    bgColor: {
      type: String,
      default: '#fff',
    },
    full: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Boolean,
      default: false,
    },
    bottomFixedHeight: {
      type: [String, Number],
      default: '112px',
    },
    props: {
      type: Object,
      default: () => ({
        pageNum: 'pageNum',
        pageSize: 'pageSize',
        total: 'total',
      }),
    },
    columnHeight: {
      type: String,
      default: '100%',
    },
    tableAutoHeight: {
      type: Boolean,
      default: true,
    },
    stretch: {
      type: Boolean,
      default: false,
    },
    showSearchValue: {
      type: Boolean,
      default: false,
    },
    sidebarOpened: {
      type: Boolean,
      default: true,
    },
    upText: {
      type: String,
      default: '收起',
    },
    downText: {
      type: String,
      default: '展开',
    },
  })

  const data = reactive({
    orderIndex: 0,
    searchValue: [],
    id: `id_${this._uid}`,
    leftAttrs: {},
    rightAttrs: {},
    formEl: null,
    resizeOb: null,
    showExpandBtn: false,
    isExpand: false,
    positionLeft: 0,
  })

  onCreated(() => {
    const genPadding = sPadding => {
      const [top, right, bottom, left] = sPadding?.split(' ') || []
      return [top, right ?? top, bottom ?? top, left ?? right ?? top]
    }
    this.leftAttrs = this.$slots?.left?.[0]?.data?.attrs || { 's-disabled': false }
    this.rightAttrs = this.$slots?.right?.[0]?.data?.attrs || { 's-disabled': false }
    this.leftAttrs['s-padding'] = genPadding(this.leftAttrs?.['s-padding'])
    this.rightAttrs['s-padding'] = genPadding(this.rightAttrs?.['s-padding'])
  })

  onMounted(() => {
    this.formEl = document.querySelector(`#${this.id} .el-form`)
    if (this.formEl && this.stretch) {
      this.resizeOb = genResizeObserver()
      this.resizeOb.observe(this.formEl)
    }
  })

  const genResizeObserver = () => {
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
  }

  const genSearchValue = () => {
    if (this.showSearchValue === false) return
    this.searchValue = []
    const formItems = this.$slots.search[0].elm.__vue__.$children
    formItems.forEach((item, index) => {
      const { label, prop } = item.$options.propsData
      const subLabel = item.$attrs['subLabel'] || item.$attrs['sub-label']
      const selectInput = item.$children.find(i => i.$options._componentTag === 'select-input')

      if (selectInput) {
        const { options, searchForm } = selectInput.$options.propsData
        const currentSelect = selectInput._data.select
        options.forEach(({ label, key }) => {
          if (
            (!(key === currentSelect && index <= this.orderIndex) &&
              !this.isExpand &&
              searchForm[key]) ||
            (searchForm[key] && key !== currentSelect && this.isExpand)
          ) {
            this.searchValue.push({
              label: subLabel || label,
              value: searchForm[key],
              prop: key,
            })
          }
        })
      } else if (!this.isExpand) {
        const value = Array.from(item.$el.getElementsByTagName('input') || [])
          .map(i => i.value)
          .filter(i => i)
          .join(' - ')
        if (value && index > this.orderIndex)
          this.searchValue.push({ label: subLabel || label, value, prop })
      }
    })
  }

  const handleDeleteTag = ({ prop }, index) => {
    this.searchValue.splice(index, 1)
    if (!prop) return
    const { model } = this.$slots.search[0].elm.__vue__
    model[prop] = Array.isArray(model[prop]) ? [] : typeof model[prop] === 'object' ? {} : ''
  }

  const reorder = () => {
    const form = document.querySelector(`#${this.id} .el-form`)

    let {
      ['form-width']: form_width,
      formWidth,
      ['first-line-item-num']: first_line_item_num,
      firstLineItemNum,
    } = this.$slots.search[0].elm.__vue__.$attrs
    const hasFormWidthAttr = !!(form_width || formWidth)
    firstLineItemNum = Number(firstLineItemNum || first_line_item_num || 0)
    form.style.width = formWidth || form_width || '100%'
    formWidth = form.offsetWidth

    const formItems = form.querySelectorAll(`.el-form-item`)
    let formSenior = form.querySelector(`.form-senior`)
    const searchBtns = document.querySelector(`#${this.id} .page-search__btns`)
    const searchBtnsWidth = searchBtns.offsetWidth
    let orderIndex = 0

    let len = formItems.length,
      lastChild = formItems[len - 1],
      {
        marginRight: lastMarginRight,
        width: lastWidth,
        height,
        marginBottom,
      } = getComputedStyle(lastChild),
      childrenWidth = parseFloat(lastMarginRight) + parseFloat(lastWidth)

    if (!this.isExpand && this.formEl) {
      this.formEl.style.height = parseFloat(height) + parseFloat(marginBottom) + 'px'
    }

    lastChild.style.order = len
    if (!formSenior) {
      formSenior = document.createElement('div')
      formSenior.className = 'form-senior'
      formSenior.style.order = len + 1
      form.insertBefore(formSenior, lastChild)
    }
    formSenior.style.width = `calc(${hasFormWidthAttr ? 0 : searchBtnsWidth}px + 100%)`
    formSenior.style.marginRight = `-${hasFormWidthAttr ? 0 : searchBtnsWidth}px`
    for (let i = 0; i < len - 1; i++) {
      let formItem = formItems[i]
      let { marginRight, marginLeft, width } = getComputedStyle(formItem)
      childrenWidth += parseFloat(marginRight) + parseFloat(marginLeft) + parseFloat(width)
      if (childrenWidth > formWidth || (firstLineItemNum && i > firstLineItemNum - 1)) {
        formItem.style.order = len + 2
        this.showExpandBtn = true
        formSenior.appendChild(formItem)
      } else {
        form.insertBefore(formItem, formSenior)
        this.positionLeft = childrenWidth - 80
        formItem.style.order = i
        orderIndex = i
        if (i === len - 2) formSenior.remove()
      }
    }

    this.orderIndex = orderIndex
    this.genSearchValue()
    if (childrenWidth < formWidth) this.showExpandBtn = false
  }

  const handleSizeChange = val => {
    this.pagination[this.props.pageSize || 'pageSize'] = val
    this.$emit('query')
  }

  const handleCurrentChange = val => {
    this.pagination[this.props.pageNum || 'pageNum'] = val
    this.$emit('query')
  }
</script>

<style scoped lang="scss">
  .page-wrapper {
    height: 100%;
    width: 100%;

    &.page-wrapper--full {
      & > .page-container {
        padding: 0;
      }
    }

    &.page-wrapper--bottom {
      margin-bottom: $bottomFixedHeight;
      & > .page-container {
        height: calc(100% - #{$bottomFixedHeight});
      }

      &.page-wrapper--full {
        margin-bottom: calc(#{$bottomFixedHeight} - #{$containerPadding});
      }
    }

    &.page-wrapper--row {
      & > .page-container {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }

    & > .page-container {
      height: 100%;
      width: 100%;
      padding: 15px 20px;
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
        :deep(.el-scrollbar__wrap) {
          overflow-x: hidden;
        }
        &.page-scrollbar--disabled {
          & > :deep(.el-scrollbar__wrap) {
            & > .el-scrollbar__view {
              height: 100%;
              overflow: hidden;

              & > div {
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

        :deep(.el-form) {
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          margin-bottom: 10px;

          .form-senior {
            background: #f3f3f3;
            padding-top: 8px;
            width: 100%;

            .el-form-item__label {
              padding-left: 8px;
            }
          }

          .el-form-item {
            margin-bottom: 8px;
            margin-right: 15px;
          }

          & > .el-form-item:last-child {
            padding-right: 80px;
          }
        }

        &.page-search__expand {
          :deep(.el-form) {
            overflow: unset;
            .el-form-item {
              display: inline-block !important;
            }
          }
        }
      }

      .page-search__btns {
        flex-shrink: 0;
      }

      &:has(.page-search__expand) + .page-search__value {
        margin-top: -2px;
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

      & > span {
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
      color: #606266;
      font-size: 12px;
      margin-top: -10px;
      z-index: 2;

      .page-search__value-item {
        margin: 0 10px 8px 0;
        border: 1px solid #c0c6cc;
        padding: 2px 8px;
        display: inline-block;
        border-radius: 12px;
        transition: all 0.3s;

        &:hover {
          border: 1px solid #909299;
        }

        .el-icon-error {
          font-size: 14px;
          margin-left: 6px;
          cursor: pointer;
          color: #666;

          &:hover {
            color: #333;
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

        :deep(.el-table) {
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
