<template>
  <el-input class="select-input" :placeholder="placeholder" v-model="input" :clearable="clearable">
    <template #prepend>
      <el-select v-model="select" placeholder="请选择" @change="handleSelChange">
        <el-option
          v-for="item in options"
          :label="item[props.label]"
          :value="item[props.value]"
          :key="item[props.value]"
        />
      </el-select>
    </template>
  </el-input>
</template>

<script setup lang="ts" name="SelectInput">
  import { ref, watch } from 'vue'

  const $props = withDefaults(
    defineProps<{
      clearable?: boolean
      options: any[]
      selectValue: string
      inputValue: string
      placeholder?: string
      props?: any
    }>(),
    {
      clearable: true,
      options: () => [],
      selectValue: '',
      inputValue: '',
      placeholder: '',
      props: {
        label: 'label',
        value: 'value',
      },
    }
  )
  const emit = defineEmits<{
    (event: 'update:selectValue', value: string): void
    (event: 'update:inputValue', value: string): void
  }>()

  const input = ref<string>('')
  const select = ref<string>('')

  watch(
    [() => $props.selectValue, () => $props.inputValue],
    ([newSelectValue, newInputValue]) => {
      select.value = newSelectValue ?? select.value
      input.value = newInputValue ?? input.value
    },
    {
      immediate: true,
    }
  )
  watch(select, newSelectValue => {
    emit('update:selectValue', newSelectValue)
  })
  watch(input, newInputValue => {
    emit('update:inputValue', newInputValue)
  })

  const handleSelChange = (): void => {
    input.value = ''
  }
</script>

<style scoped lang="scss">
  .select-input {
    ::v-deep(.el-select .el-input) {
      width: 100px;
    }
    ::v-deep(.el-input-group__prepend) {
      background-color: #fff;
    }
  }
</style>
