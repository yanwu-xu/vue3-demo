<script setup lang="ts" name="demo_page1"></script>

<template>
  <Page :table-auto-height="false" stretch>
    <template #left>
      <div class="left" s-width="200px" s-bg-color="#c2e1f7"> page-left </div>
    </template>
    <template #right>
      <div class="right" s-width="calc(100% - 200px - 20px)" s-bg-color="#fde689">age-right</div>
    </template>
  </Page>
</template>

<style lang="scss" scoped></style>
