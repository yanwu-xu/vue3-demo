# Upload组件

只支持

- 图片上传，缩略图展示

```html
<upload
  list-type="picture"
  multiple
  :accept="'.jpg,.png'"
  :on-upload="handleUpload"
  :limit="3"
></upload>

handleUpload(file) {
  // auto-upload为true，file为当前文件
}
```

- 文件上传，文件列表展示

```html
<upload
  ref="upload"
  list-type="text"
  :auto-upload="false"
  multiple
  :accept="'.xls,.xlsx'"
  :on-upload="handleUpload"
  :size="3"
  :limit="3"
>
  <el-button type="primary" plain size="mini">上传文件</el-button>
  <div slot="tip">只能上传xls, xlsx文件，且不超过3M</div>
</upload>

<div>
  <el-button type="primary" plain size="mini" @click="$refs.upload.submit()">
    提交
  <el-button>
</div>

handleUpload(files) {
  // auto-upload为false，files为数组，当前所有待上传文件
}
```

- 文件直接上传，不做列表展示

```html
<upload
  ref="upload"
  :accept="'.xls,.xlsx'"
  :on-upload="handleUpload"
  :size="3"
  :limit="3"
>
  <el-button type="primary" plain size="mini">上传文件</el-button>
  <div slot="tip">只能上传xls, xlsx文件，且不超过3M</div>
</upload>

handleUpload(files) {
  // auto-upload为true，file为当前文件
}
```

# Attributes
|   参数   |   说明   |   类型   |   默认值   |
| ---- | ---- | ---- | ---- |
|   value / v-model   |   绑定值，图片上传接口返回的文件路径，limit=1绑定值为string，limit>1绑定值为Array   |   String / Array   |   —   |
|   width   |   宽，仅图片上传有效   |   String   |   120px   |
|   height   |   高，仅图片上传有效，未设置值时，默认同宽   |   String   |   —   |
|   limit   |   最大允许上传个数   |   Number   |      |
|   multiple   |   是否支持多选文件   |   Boolean   |   false   |
|   list-type   |   文件列表的类型   |   String   |   text/picture(默认picture)   |
|   auto-upload   |   是否在选取文件后立即执行onUpload   |   Boolean   |   true   |
|   disabled   |   是否可上传或删除文件，为true时不可删除并上传文件   |   Number   |   false   |
|   show-file-list   |   为true是上传图片文件展示文件，为false不展示文件列表   |   Boolean   |   true   |
|   prefix   |   图片url的前缀   |   Number   |   —   |
|   icons   |   图片上传后操作按钮，preview预览按钮，delete展示删除按钮   |   Array   |   ['preview', 'delete']   |
|   accept   |   接受上传的文件类型（如：'.jpg,.png,.xlsx'）   |   String   |   —   |
|   size   |   文件上传的最大大小，单位MB   |   Number   |   —   |
|   on-upload   |   文件上传，参数为上传的文件，autoUpload为true参数为file，autoUpload为false参数为files   |   Function(file)   |   —   |
|   before-delete   |   删除文件之前的钩子，参数为文件index和列表当前项，若返回 false 或者返回 Promise 且被 reject，则停止删除   |   Function(index, path)   |   —   |
|   before-preview   |   预览文件之前的钩子，参数为文件index和列表当前项，若返回 false 或者返回 Promise 且被 reject，则停止组件自带的预览   |   Function(index, path)   |   —   |

# Methods
|   方法名   |   说明   |   参数   |
| ---- | ---- | ---- |
|   getObjectURL   |   通过createObjectURL获取文件的url   |   file   |
|   submit   |   手动上传文件列表   |      |

# Slots
|   插槽名   |   说明   |
| ---- | ---- |
|   default   |   触发上传的元素   |
|   tip   |   提示说明文字   |
