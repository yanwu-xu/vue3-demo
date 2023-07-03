# Attributes

同 el-table，以下为新增属性

|   参数   |   说明   |   类型   |   默认值   |
| ---- | ---- | ---- | ---- |
|   getAllData   |   获取全部数据的方法，返回Promise全部的数据   |   Function   |   —   |
|   props   |   字段名<br>onlyKey: 唯一标识的字段名<br>checked: 是否选中的字段名<br>disabled: 是否禁用的字段名<br>   |   Object   |   {<br>onlyKey:'id',<br>checked: 'checked',<br>disabled: 'disabled'<br>}   |

# Events

同 el-table，以下为新增方法

|   事件名   |   说明   |   回调参数   |
| ---- | ---- | ---- |
|   selection-result   |   当选择项发生变化时会触发该事件   |   选中的数据   |

# Methods
|   方法名   |   说明   |   参数   |
| ---- | ---- | ---- |
|   clearSelection   |   清空选中的数据   |   —   |
