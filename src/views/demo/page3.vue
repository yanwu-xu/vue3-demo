<script setup lang="ts" name="demo_page3">
import { ref } from 'vue'

const imgUrl = ref('https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100')


const updateImageUrl = (): void => {
  imgUrl.value = 'http://10.7.1.46:9000/after-sale/b86654f4-3690-490d-bdf0-a4507661bbdb/storeImage/606066746067128320.PNG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230630T021252Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=OQPKNZ375PRQK7B35D88%2F20230630%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7008ba4872ac5ecc3198dc3e7b4b9a6267d4d50e62a4b3039a106b42ea4a2306'
}
</script>

<template>
  <page>
    <div style="height: 1000px;border: 1px solid red;"></div>
    <el-button @click="updateImageUrl">更新图片</el-button>
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
