# Attributes
|   参数   |   说明   |   类型   |   默认值   |
| ---- | ---- | ---- | ---- |
|   pagination   |   分页器参数，传入表格显示分页器，不穿则不显示分页器   |   { <br>pageNum: 当前页数, <br>pageSize: 每页显示条目个数, <br>total: 总条数 <br>}<br>字段名可通过props配置   |   —   |
|   bg-color   |   内容区域背景色   |   String   |   #fff   |
|   full   |   为true内容区域padding值为0，false padding值为20px   |   Boolean   |   false   |
|   row   |   布局改为flex-direction: column;   |   Boolean   |   false   |
|   bottom-fixed-height   |   底部固定条高度   |   Number，String   |   112px   |
|   props   |   分页参数字段名   |   Object   |   {<br>pageNum:'pageNum',<br>pageSize: 'pageSize',<br>total: 'total'<br>}   |
|   column-height   |   左右布局时列的高   |   String   |   100%   |
|   stretch   |   搜索表单可展开收起   |   Boolean   |   false   |
|   showSearchValue   |   是否展示隐藏搜索条件   |   Boolean   |   false   |
|   showFormLabel   |   是否展示el-form-item的label   |   Boolean   |   true   |
|   tableAutoHeight   |   为true表格高度自由，若为false表格高度自适应页面高度，不超页面高（需设置el-table max-height="100%"）   |   Boolean   |   true   |
|   upText   |   搜索条件收起时的文案   |   String   |   收起   |
|   downText   |   搜索条件展开时的文案   |   String   |   展开   |

# Events
|   事件名   |   说明   |   回调参数   |
| ---- | ---- | ---- |
|   query   |   分页查询方法   |   —   |

# 方法 $ref 实例使用
|   方法名   |   说明   |   参数   |
| ---- | ---- | ---- |
|   reorder   |   对搜索条件的表单进行重新排序，当表单元素有变化时使用   |   —   |

# Slots（从上至下）
|   插槽名   |   说明   |
| ---- | ---- |
|   top   |   页面顶部   |
|   default   |   默认，可添加多个从上到下宽100%布局的模块   |
|   left   |   页面左侧，外层是el-scrollbar组件，内容区域可滚动   |
|   right   |   页面右侧，外层是el-scrollbar组件，内容区域可滚动   |
|   search   |   查询表单   |
|   btns   |   页面右上角操作按钮，如新增，批量删除   |
|   table   |   表格   |
|   paginationLeft   |   分页器左侧，没有分页器无效   |
|   bottom   |   页面底部   |
|   bottomFixed   |   页面底部固定   |

# Left Right Slot Attributes 添加前缀s-， 区分props
|   参数   |   说明   |   类型   |   默认值   |
| ---- | ---- | ---- | ---- |
|   s-width   |   左（右）侧区域的宽，calc(100% - 10% - 20px)   |   String   |   —   |
|   s-padding   |   左（右）区域padding值   |   String   |   0   |
|   s-margin-left   |   右侧margin-left值   |   String   |   20px   |
|   s-disabled   |   禁止区域滚动   |   Boolean   |   false   |
|   s-bg-color   |   背景色   |   String   |   —   |

# 页面flex布局
```css
display: flex;
flex-direction: column;
justify-content: flex-start;

/* row = 'true' */
flex-direction: row;
```
