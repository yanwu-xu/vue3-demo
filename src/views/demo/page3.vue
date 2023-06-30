<script setup lang="ts" name="demo_page3">
import { ref } from 'vue'

const imgUrl = ref('https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100')
</script>

<template>
  <page>
    <div style="height: 1000px;border: 1px solid red;"></div>
    <div>
      <img v-lazy="imgUrl" alt="" />
    </div>
    <div>
      <img v-lazy="imgUrl" alt="" />
    </div>
    <div>
      <img v-lazy="imgUrl" alt="" />
    </div>
    <div>
      <img v-lazy="imgUrl" alt="" />
    </div>
    <div>
      <img v-lazy="imgUrl" alt="" />
    </div>
    <div>
      <img v-lazy="imgUrl" alt="" />
    </div>
    <div>
      <img v-lazy="imgUrl" alt="" />
    </div>
  </page>
</template>

<style lang="scss" scoped></style>
