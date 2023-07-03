<template>
  <div class="uploader-wrapper">
    <template v-if="showFileList && fileList.length && listType === 'picture'">
      <div
        class="file-pic-item"
        :style="{ width: width, height: height || width }"
        v-for="(item, index) in fileList"
        :key="index"
      >
        <img :src="prefix + item" />
        <div class="handler" v-if="icons && icons.length">
          <i
            v-if="icons.includes('delete') && !disabled"
            class="el-icon-delete"
            @click="handleDelete(index, item)"
          ></i>
          <i
            v-if="icons.includes('preview')"
            class="el-icon-zoom-in"
            @click="handlePreview(index, item)"
          ></i>
        </div>
      </div>
    </template>

    <el-upload
      v-if="
        !showFileList ||
        (showFileList && listType === 'picture' && fileList.length < limit) ||
        (showFileList && listType === 'text')
      "
      class="uploader"
      :disabled="disabled"
      action=""
      :accept="accept"
      :multiple="multiple !== false"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <div
        v-if="!$slots.default"
        class="uploader-handler"
        :style="{ width: width, height: height || width }"
      >
        <i class="el-icon-plus uploader-icon"></i>
        <span>点击上传图片</span>
      </div>
      <slot v-else></slot>
    </el-upload>

    <div class="uploader-tip" v-if="$slots.tip"><slot name="tip"></slot></div>

    <template v-if="showFileList && fileList.length && listType === 'text'">
      <div class="file-text-item" v-for="(item, index) in fileList" :key="index">
        <i class="el-icon-document"></i>
        <span>{{ item }}</span>
        <i class="el-icon-circle-check"></i>
        <i class="el-icon-circle-close" v-if="!disabled" @click="handleDelete(index, item)"></i>
      </div>
    </template>

    <el-dialog class="img-view-dialog" v-model:visible="dialogVisible" width="600px" append-to-body>
      <div>
        <img :src="prefix + imgUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Upload">
  import { ref, watch } from 'vue'
  import { ElMessage } from 'element-plus'

  const $emit = defineEmits<{
    (event: 'update:modelValue', fileList: any[]): void
  }>()
  const $props = defineProps({
    modelValue: {
      type: [String, Array],
    },
    width: {
      type: String,
      default: '120px',
    },
    height: {
      type: String,
    },
    limit: {
      type: Number,
      default: 5,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    listType: {
      type: String,
      default: 'picture',
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    prefix: {
      type: String,
      default: '',
    },
    accept: {
      type: String,
      default: '',
    },
    icons: {
      type: Array,
      default: () => ['preview', 'delete'],
    },
    size: {
      type: Number,
    },
    onUpload: {
      type: Function,
    },
    beforeDelete: {
      type: Function,
    },
    beforePreview: {
      type: Function,
    },
  })

  const dialogVisible = ref<boolean>(false)
  const imgUrl = ref<string>('')
  const fileList = ref<any[]>([])
  const fileObjects = ref<any[]>([])

  watch(
    () => $props.modelValue,
    newModelValue => {
      const newModelValueList = Array.isArray(newModelValue) ? newModelValue : [newModelValue]
      fileList.value = newModelValueList.length ? [newModelValueList].slice(0, $props.limit) : []
    },
    { immediate: true }
  )

  watch(fileList, newfileList => {
    $emit('update:modelValue', $props.limit === 1 ? newfileList[0] : newfileList)
  })

  const getObjectURL = file => {
    let url = null
    if ((window as any).createObjectURL != undefined) {
      url = (window as any).createObjectURL(file)
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = (window as any).URL.createObjectURL(file)
    } else if ((window as any).webkitURL != undefined) {
      // webkit or chrome
      url = (window as any).webkitURL.createObjectURL(file)
    }
    return url
  }

  const beforeUpload = file => {
    if (
      !$props.autoUpload &&
      fileObjects.value.some(
        i =>
          i.name === file.name &&
          i.lastModified === file.lastModified &&
          i.size === file.size &&
          i.type === file.type
      )
    ) {
      ElMessage.warning(`${file.name} 文件已存在，请勿重复上传！`)
      return false
    }

    if ($props.limit && fileList.value.length >= $props.limit) {
      ElMessage.warning(`已达到最大文件上传数，最多上传${$props.limit}个文件！`)
      return false
    }

    const fileType = file.name.match(/.*(\.[a-zA-Z]+)$/)[1].toLocaleLowerCase()
    if ($props.accept && !$props.accept.split(',').includes(fileType)) {
      ElMessage.warning(`文件格式不支持，只允许上传${$props.accept}的文件！`)
      return false
    }

    const size = file.size
    if ($props.size && $props.size * 1024 * 1024 < size) {
      ElMessage.warning(`文件大小不能超过${size}MB！`)
      return false
    }

    if ($props.autoUpload) {
      $props?.onUpload?.(file)
    } else {
      file.index = fileList.value.length
      if ($props.listType === 'picture') {
        fileList.value.push(getObjectURL(file))
        fileObjects.value.push(file)
      } else {
        fileList.value.push(file.name)
        fileObjects.value.push(file)
      }
    }

    return false
  }

  const handleDelete = (index, item) => {
    beforeDeleteBox(index, item).then(() => {
      fileList.value.splice(index, 1)
      fileObjects.value.splice(index - fileList.value.length, 1)
    })
  }

  const beforeDeleteBox = (index, item): Promise<any> => {
    return new Promise<void>((reslove, reject) => {
      const result = $props?.beforeDelete?.(index, item)
      if (result === false) {
        reject()
      } else if (result?.then) {
        result?.then(
          () => reslove(),
          () => reject()
        )
      } else {
        reslove()
      }
    })
  }

  const handlePreview = (index, item) => {
    beforePreviewBox(index, item).then(() => {
      imgUrl.value = fileList.value[index]
      dialogVisible.value = true
    })
  }

  const beforePreviewBox = (index, item): Promise<any> => {
    return new Promise<void>((reslove, reject) => {
      const result = $props?.beforePreview?.(index, item)
      if (result === false) {
        reject()
      } else if (result?.then) {
        result?.then(
          () => reslove(),
          () => reject()
        )
      } else {
        reslove()
      }
    })
  }
</script>

<style lang="scss" scoped>
  .uploader-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .uploader-tip {
    width: 100%;
    color: #7c7c7c;
    margin-bottom: 10px;
  }

  .uploader {
    margin-bottom: 10px;
    .uploader-handler {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: #eee;
      color: #999;
      font-size: 12px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
      .uploader-icon {
        font-size: 18px;
        line-height: 32px;
        color: #000;
      }
    }
  }

  .file-text-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #606266;
    padding: 6px 4px;
    transition: all 0.3s;
    &:hover {
      background: #f0f5fd;
      .el-icon-circle-check {
        display: none;
      }
      .el-icon-circle-close {
        display: block;
      }
    }
    & > span {
      flex-grow: 1;
      padding: 0 5px;
    }
    i {
      font-size: 14px;
      & + i {
        margin-left: 5px;
      }
    }
    .el-icon-circle-check {
      color: #67c23a;
    }
    .el-icon-circle-close {
      display: none;
      cursor: pointer;
      color: #333;
      &:hover {
        color: #8f8d8d;
      }
    }
  }

  .file-pic-item {
    position: relative;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    & + .file-pic-item,
    & + .uploader {
      margin-left: 20px;
    }
    &:hover {
      border-color: #409eff;
      .handler {
        display: flex;
      }
    }
    img {
      width: 100%;
    }
    .handler {
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.322);
      width: 100%;
      height: 100%;
      display: none;
      justify-content: center;
      align-items: center;
      color: #fff;
      i {
        font-size: 18px;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }

  ::root {
    .img-view-dialog {
      ::v-deep(.el-dialog__header) {
        border: none;
      }
      img {
        width: 100%;
      }
    }
  }
</style>
