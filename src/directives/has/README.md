## v-has 指令的使用

##### 修饰符

|   参数   |   说明   |   示例   |
| ---- | ---- | ---- |
|   show   |   是否显示   |  v-has.show    |
|   click   |   是否可点击   |   v-has.click   |
|   clickChild   |   子节点是否可点击   |   v-has.clickChild   |
|   move   |   是否可拖拽   |   v-has.move   |
|   moveChild   |   子节点是否可拖拽   |   v-has.moveChild   |

##### 参数

- 参数为String类型

|   参数   |   说明   |   类型   |
| ---- | ---- | ---- |
|   code   |   权限的唯一标识   |  string    |

- 参数为Object类型

|   参数   |   说明   |   类型   |   默认值   |
| ---- | ---- | ---- | ---- |
|   code   |   权限的唯一标识   |  string    |      |
|   childNode   |   指令作用于子节点上<br />（作用于clickChild、moveChild）   |  string / array[nodelist]    |      |
|   allowClickClass   |   允许点击的子节点的class   |  string / array    |   .v-click-allow   |
|   cursorClass   |   修改光标样式的class   |   string / array   |  .v-cursor-style    |
|   cursorStyle   |   光标样式   |  string    |   not-allowed   |

##### 示例

```js
// 判断 el-tree 的节点点击拖拽权限
v-has.moveChild.clickChild="{
    code: 'code',
    childNode: '.el-tree-node__content',               // 节点对应的class
    allowClickClass: ['.el-tree-node__expand-icon']     // 节点前的图标仍可点击展开收起
}

// 判断 el-table 的行点击权限
v-has.clickChild="{
    code: 'code',
    childNode: '.el-table__body-wrapper tr, .el-table__fixed-body-wrapper tr',   // 行对应的class
    allowClickClass: ['.el-button']                                              // 表格行中的按钮仍可点击
}
```

##### 使用

```js
import Vue from 'vue'
import store from './store'
import { has } from './has.js'

Vue.use(has, store.getters)
```
