<template>
  <el-table :data="data" v-bind="$attrs">
    <el-table-column width="150" label-class-name="table-selection-column">
      <template #header>
        <el-dropdown class="table-selection">
          <span class="table-selection-link">选择</span>
          <template #dropdown>
            <el-dropdown-menu class="table-selection-dropdown">
              <el-checkbox v-model="all" @change="handleAllChange" :indeterminate="indeterminateAll"
                >全选</el-checkbox
              >
              <el-checkbox
                v-model="pageAll"
                @change="handlePageAllChange"
                :indeterminate="indeterminatePageAll"
              >
                本页全选
              </el-checkbox>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>

      <template #default="{ row }">
        <el-checkbox
          v-model="row[keys.checked]"
          @change="handleCheck(row)"
          :disabled="row[keys.disabled]"
        />
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script setup lang="ts" name="TableSelection">
  import { ref, computed, watch } from 'vue'

  const emit = defineEmits<{
    (event: 'selection-result', value: any[]): void
  }>()
  const $props = withDefaults(
    defineProps<{
      data: any[]
      getAllData?: () => Promise<any>
      props?: { onlyKey: string; checked: string; disabled: string }
    }>(),
    {
      data: () => [],
      getAllData: () => Promise.resolve(),
      props: () => ({
        onlyKey: 'id',
        checked: 'checked',
        disabled: 'disabled',
      }),
    }
  )

  const keys = computed(() => {
    return {
      ...{
        onlyKey: 'id',
        checked: 'checked',
        disabled: 'disabled',
      },
      ...$props.props,
    }
  })

  const all = ref<boolean>(false)
  const pageAll = ref<boolean>(false)
  let selection = ref<any[]>([])
  const total = ref<number>(0)

  const selectionId = computed(() => {
    return selection.value.map(i => i[keys.value.onlyKey])
  })
  const indeterminateAll = computed(() => {
    return !all.value && !!selection.value.length
  })
  const indeterminatePageAll = computed(() => {
    return !pageAll.value && $props.data.some(item => item[keys.value.checked])
  })

  watch(
    () => $props.data,
    newData => {
      pageAll.value = $props.data.every(i => i[keys.value.checked] || i[keys.value.disabled])
      newData.forEach(i => {
        i[keys.value.checked] = selection.value.some(
          j => j[keys.value.onlyKey] === i[keys.value.onlyKey]
        )
      })
    }
  )
  watch(selection, newSelection => {
    emit('selection-result', newSelection)
  })

  const handleAllChange = val => {
    pageAll.value = val
    if (val) {
      $props.getAllData().then(list => {
        selection.value = list.filter(i => !i[keys.value.disabled])
        total.value = selection.value.length
        $props.data.forEach(i => {
          i[keys.value.checked] = val && !i[keys.value.disabled]
        })
      })
    } else {
      selection.value = []
      $props.data.forEach(i => {
        i[keys.value.checked] = val
      })
    }
  }

  const handlePageAllChange = val => {
    $props.data.forEach(i => {
      i[keys.value.checked] = val && !i[keys.value.disabled]
      if (
        val &&
        !i[keys.value.disabled] &&
        !selection.value.some(j => j[keys.value.onlyKey] === i[keys.value.onlyKey])
      ) {
        selection.value.push(i)
      }
      if (!val) {
        selection.value = selection.value.filter(
          j => j[keys.value.onlyKey] !== i[keys.value.onlyKey]
        )
      }
    })
    all.value = val && total.value === selection.value.length
  }

  const handleCheck = row => {
    pageAll.value = $props.data.every(i => i[keys.value.checked] || i[keys.value.disabled])
    if (!row[keys.value.disabled] && row[keys.value.checked]) {
      selection.value.push(row)
    } else {
      selection.value = selection.value.filter(
        j => j[keys.value.onlyKey] !== row[keys.value.onlyKey]
      )
    }
    all.value = pageAll.value && total.value === selection.value.length
  }

  const clearSelection = () => {
    all.value = false
    pageAll.value = false
    selection.value = []
    $props.data.forEach(i => {
      i[keys.value.checked] = false
    })
  }

  defineExpose({
    selectionId,
    clearSelection
  })
</script>

<style lang="scss" scoped>
  .table-selection {
    padding: 0;
    line-height: 23px;
    display: inline;
    cursor: pointer;

    .table-selection-link {
      color: $mainColor;
      text-decoration: underline;
      padding-left: 10px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
</style>

<style lang="scss">
  .table-selection-column {
    padding: 0 !important;
  }
  .table-selection-dropdown {
    margin-top: 5px !important;
    margin-right: 10px !important;

    .popper__arrow {
      display: none;
    }

    .el-checkbox {
      display: block;
      margin: 5px 10px;
    }
  }
</style>
