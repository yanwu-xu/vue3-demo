<script setup lang="ts" name="demo_page1">
import { reactive } from 'vue'

const searchForm = reactive({
  queryFiled1: '11',
  queryFiled2: '',
  queryFiled3: '',
  queryFiled4: ''
})
const pagination = reactive<{ pageNum: number, pageSize: number, total: number | string }>({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const handleQuery = (firstpage: string): void => {
  if (firstpage) pagination.pageNum = 1
  const params = { ...searchForm, ...pagination }
  tableData = [
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' },
    { name: '公司a' }
  ]
}
</script>

<template>
  <Page :pagination="pagination" :table-auto-height="false" show-search-value stretch @query="handleQuery">
    <template #left>
      <div class="left" s-width="200px" s-bg-color="#c2e1f7">
        page-left
      </div>
    </template>
    <template #right>
      <div class="right" s-width="calc(100% - 200px - 20px)" s-bg-color="#fde689">age-right</div>
    </template>
  </Page>
</template>

<style lang="scss" scoped></style>
