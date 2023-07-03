<script setup lang="ts" name="demo_page1">
  import { ref, reactive } from 'vue'

  const dialogVisible = ref(false)
  const searchForm = reactive({
    queryFiled1: '',
    queryFiled2: '',
    queryFiled3: '',
    queryFiled4: '',
  })
  const pagination = reactive<{ pageNum: number; pageSize: number; total: number | string }>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
  const options = reactive([
    {
      value: 'zhinan',
      label: '指南',
      children: [
        {
          value: 'shejiyuanze',
          label: '设计原则',
          children: [
            {
              value: 'yizhi',
              label: '一致',
            },
            {
              value: 'fankui',
              label: '反馈',
            },
            {
              value: 'xiaolv',
              label: '效率',
            },
            {
              value: 'kekong',
              label: '可控',
            },
          ],
        },
        {
          value: 'daohang',
          label: '导航',
          children: [
            {
              value: 'cexiangdaohang',
              label: '侧向导航',
            },
            {
              value: 'dingbudaohang',
              label: '顶部导航',
            },
          ],
        },
      ],
    },
  ])
  const tableData = ref([
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
  ])

  const handleQuery = (firstpage: string): void => {
    if (firstpage) pagination.pageNum = 1
    // @ts-ignore
    // 这个params没有用到, 暂时忽略掉这个错误
    const params = { ...searchForm, ...pagination }
    tableData.value = [
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
      { name: '公司b' },
    ]
  }

  const handleShowDialog = () => {
    dialogVisible.value = true
  }

  const handleDelete = (): void => {
    tableData.value = [{ name: '公司a' }]
  }
</script>

<template>
  <Page
    :pagination="pagination"
    :table-auto-height="false"
    show-search-value
    stretch
    @query="handleQuery"
  >
    <template #search>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="输入框">
          <el-input v-model="searchForm.queryFiled1" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="下拉框">
          <el-select v-model="searchForm.queryFiled2" placeholder="请选择">
            <el-option label="黄金糕" value="1" />
            <el-option label="双皮奶" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="searchForm.queryFiled3"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="级联">
          <el-cascader v-model="searchForm.queryFiled4" :options="options" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery('firstpage')">查询</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #btns>
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
      <el-button type="primary" plain @click="handleDelete">批量删除</el-button>
    </template>

    <template #table>
      <el-table :data="tableData" border size="large" stripe max-height="100%">
        <el-table-column prop="name" label="公司名称" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column label="操作" width="220">
          <template #default>
            <el-button-group size="small">
              <el-button type="primary">编辑</el-button>
              <el-button type="danger" plain>删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template #paginationLeft>
      <div>已选中10条</div>
    </template>
  </Page>
</template>

<style lang="scss" scoped></style>
