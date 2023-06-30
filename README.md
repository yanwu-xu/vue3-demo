#

## vue3 新特性

```html
<!-- vue2 demo -->
<template>
    <div>
        <div :style="{ color: fontColor }">{{ count }}</div>
        <div :style="{ color: fontColor }">{{ doubleCount }}</div>
        <x-button @click="handleAdd">加1</x-button>
    </div>
</template>

<script>
import xButton from './xButton.vue'

export default {
    name: 'demo',
    components: { xButton },
    props: {
        fontColor: {
            type: String,
            default: 'red'
        }
    },
    computed: {
        doubleCount() {
            return this.count * 2
        }
    },
    data() {
        return {
            count: 0
        }
    },
    mounted() {
        this.handleAdd()
    },
    methods: {
        handleAdd() {
            this.count++
            this.$emit('updateCount', this.count)
        }
    }
}
</script>
```

```html
<!-- vue3 demo -->
<template>
    <div>
        <div :style="{ color: fontColor }">{{ count }}</div>
        <div :style="{ color: fontColor }">{{ doubleCount }}</div>
        <x-button @click="handleAdd">加1</x-button>
    </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import xButton from './xButton.vue'

export default defineComponent({
  name: 'demo',
  components: { xButton },
  props: {
      fontColor: {
          type: String,
          default: 'red'
      }
  },
  /* <child :fontColor="red" @updateCount="updateCount"></child> */
  emits: {
    updateCount: () => {
        console.log('没有updateCount方法')
    }
  },
  setup(props, context) {
    // 使count具有响应式
    const count = ref(0)

    const handleAdd = () => {
        count.value++
        context.emit('updateCount', count.value)
    }

    const doubleCount = computed(() => {
      return count.value * 2
    })

    onMounted(() => {
      handleAdd()
    })
    // 返回的对象，被挂载到了 Vue实例对象上
    return {
        count,
        doubleCount,
        handleAdd
    }
  }
});
</script>
```

```html
<!-- vue3 setup demo -->
<template>
    <div>
        <div :style="{ color: props.fontColor }">{{ count }}</div>
        <div :style="{ color: props.fontColor }">{{ doubleCount }}</div>
        <x-button @click="handleAdd">加1</x-button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted } from 'vue'
import xButton from './xButton.vue'

const props = defineProps({
  fontColor: {
    type: String,
    default: 'red',
  }
})

const emit = defineEmits(['updateCount'])

const count = ref(0)

const handleAdd = () => {
  count.value++
  emit('updateCount', count.value)
}

const doubleCount = computed(() => {
  return count.value * 2;
})

onMounted(() => {
  handleAdd()
})
</script>
```

### Composition API

![alt 属性文本](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f9d33731796417c9b8035990e4e52cd~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

```html
<!-- hook.js -->
<script>
// defineProps, defineEmits不能在这边使用
import { ref, computed, onMounted } from 'vue'

const useCountHook = (emit) => {
    const count = ref(0)

    const handleAdd = () => {
      count.value++
      emit('updateCount', count.value)
    }

    const doubleCount = computed(() => {
      return count.value * 2;
    })

    onMounted(() => {
      handleAdd()
    })

    return {
        count,
        doubleCount,
        handleAdd
    }
}

export { useCountHook }
</script>

<!-- vue3 setup hook demo -->
<template>
    <div>
        <div :style="{ color: props.fontColor }">{{ count }}</div>
        <div :style="{ color: props.fontColor }">{{ doubleCount }}</div>
        <x-button @click="handleAdd">加1</x-button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import xButton from './xButton.vue'
import { useCountHook } from './hook'

const props = defineProps({
  fontColor: {
    type: String,
    default: 'red',
  }
})

const emit = defineEmits(['updateCount'])

const { count, doubleCount, handleAdd } = useCountHook(emit, props)
</script>
```

![alt 属性文本](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbee55cc74ba45e2b7883c78cf7aa691~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### setup

vue3 Composition API 新特性提供了统一的入口。

#### 执行时机

setup 函数会在 beforeCreate 之后、created 之前执行

#### 参数

```js
const MyComponent = {
  setup(props, context) {
    context.attrs
    context.parent
    context.root
    context.slots
    context.emit
    context.refs
  }
}
```

***setup中无法访问this***

#### Composition  API

##### 1. reactive

reactive() 函数接收一个普通对象，返回一个响应式的数据对象，用来创建响应式的数据对象

``` js
<p>当前的 count 值为：{{count}}</p>

import { reactive } from 'vue'

setup() {
     // 创建响应式数据对象
    const state = reactive({ count: 0 })

     // setup 函数中将响应式数据对象 return 出去，供 template 使用
    return state
}
```

***谨慎使用解构赋值、扩展运算符***

```js
setup() {
    const state = reactive({ count: 0 })

    // 双向绑定失效
    return { ...state }
}
```

##### 2. ref

ref() 函数用来根据给定的值创建一个响应式的数据对象，ref() 函数调用的返回值是一个对象，这个对象上只包含一个 .value 属性

```js
<p>{{ count }}</p>

import { ref } from 'vue'

setup() {
    const count = ref(0)

    count.value++

     return {
         count
     }
}
```

##### 3. isRef

isRef() 用来判断某个值是否为 ref() 创建出来的对象

```js
import { isRef } from 'vue'

const unwrapped = isRef(foo) ? foo.value : foo
```

##### 4. toRefs

toRefs() 函数可以将 reactive() 创建出来的响应式对象，转换为普通的对象，只不过，这个对象上的每个属性节点，都是 ref() 类型的响应式数据

```js
import { toRefs, ref, reactive } from 'vue'

setup() {
    const state = reactive({ count: 0 })
    const count = ref(0)

    // 解决扩展运算符双向绑定失效问题
    return { 
        ...toRefs(state),
        count
    }
}
```

##### 5. computed

computed() 用来创建计算属性，computed() 函数的返回值是一个 ref 的实例

```js
import { computed } from 'vue'

// 创建一个 ref 响应式数据
const count = ref(1)

// 根据 count 的值，创建一个响应式的计算属性 plusOne
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 输出 2
```

可读可写的计算属性

```js
const count = ref(1)

// 创建一个 computed 计算属性
const plusOne = computed({
  // 取值函数
  get: () => count.value + 1,
  // 赋值函数
  set: val => {
    count.value = val - 1
  }
})
```

##### 6. watch

watch() 函数用来监视某些数据项的变化

```js
import { watch } from 'vue'

// 监听reactive类型的数据
const state = reactive({ count: 0, name: 'zs' })

watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
// 监听多个值
watch(
  [() => state.count, () => state.name],
  ([count, name], [prevCount, prevName]) => {
     /* ... */
  },
  {
    immediate: true
  }
)

// 监听ref类型的数据
const count = ref(0)

watch(count, (count, prevCount) => {
  /* ... */
})

const stop = watch(
  [count, name], // 需要被监视的多个 ref 数据源
  ([count, name], [prevCount, prevName]) => {
    /* ... */
  }
)

// 消除监听
stop()
```

***错误监听***

```js
import { watch } from 'vue'


const state = reactive({ count: 0, name: 'zs' })
/*
   直接监听reactive类型的数据时,oldValue无法正确获取
   强制开启deep深度监听（无法关闭）
*/
watch(
  state,
  (newVal, oldVal) => {
    /* ... */
  }
)

/*
   不能监听
   watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types
*/
watch(
  state.count,
  (newVal, oldVal) => {
     /* ... */
  }
)
```

##### 7. watchEffect

监听引用数据类型的所有属性，不需要具体到某个属性，一旦运行就会立即监听(相当于immediate: true)，组件卸载的时候会停止监听

```js
import { reactive, watchEffect } from 'vue'

let state = reactive({
    count:0
})

watchEffect(() => {
    console.log(state.count)
})
```

##### 8. LifeCycle Hooks (生命周期)

```js
import { onMounted } from '@vue/composition-api'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
  }
}
```

- beforeCreate -> use setup()
- created -> use setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- errorCaptured -> onErrorCaptured

##### 9. template refs

通过ref引用页面的元素或组件

```html
<template>
  <div>
    <h3 ref="h3Ref">TemplateRef</h3>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    // 创建一个 DOM 引用
    const h3Ref = ref(null)

    // 在 DOM 首次加载完毕之后，才能获取到元素的引用
    onMounted(() => {
      // 为 dom 元素设置字体颜色
      // h3Ref.value 是原生DOM对象
      h3Ref.value.style.color = 'red'
    })

    // 把创建的引用 return 出去
    return {
      h3Ref
    }
  }
}
</script>
```

v-for时获取多个元素或组件

```html
<template>
  <div v-for="(item, index) in 3" :key="index">
    <h3 :ref="(el) => h3Refs[index] = el">TemplateRef</h3>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const h3Refs = ref([])

    return {
      h3Refs
    }
  }
}
</script>
```

子组件使用`<script setup>`时，父组件获取子组件中的方法

使用 `<script setup>` 的组件是默认关闭的，也即通过模板 ref 或者 $parent 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。

```js
<script setup>
const handleClick = () => {
  console.log('暴露给父组件')
}

// 需要将方法、数据暴露出来
defineExpose({ handleClick })
</script>
```

##### 10. v-model

vue2: v-model是:value和@input的语法糖

```html
<input v-model="value">
<!-- 等同于 -->
<input :value="value" @input="val => value = val">
​````

vue3: 支持多个v-model，v-model 是 v-model:modelValue 的简写
绑定其他字段，如：v-model:name

​```html
<!-- 父组件 -->
<template>
  <child
    v-model="state.name"
    v-model:age="state.age"
  />
</template>

<script setup>
  import { reactive } from 'vue'
  // 引入子组件
  import child from './child.vue'

  const state = reactive({
    name: 'Jerry',
    age: 20
  })
</script>

<!-- 子组件 -->
<template>
  <!-- vue3支持多个根节点 -->
  <div @click="emit('update:modelValue', 'Tom')">我叫{{ modelValue }}，</div>
  <div @click="emit('update:age', 30)">今年{{ age }}岁</div>
</template>

<script setup>
  // defineEmits和defineProps在<script setup>中自动可用，无需导入
  const props = defineProps({
    modelValue: String,
    age: Number
  })

  // 1. emit 正常用法
  const emit = defineEmits(['update:modelValue', 'update:age'])
  
  // 2. vue 3.3+ 另一种语法
  // const emit = defineEmits<{
    // change: [id: number] // 具名元组语法
    // update: [value: string]
  // }>()
</script>
```

11. #####  vue文件中访问插槽

```html
<!-- 在 Vue 2 中，可以通过 $slots 来访问插槽内容 -->
<template>
  <div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<!-- 被插槽组件内部 -->
<script>
export default {
  mounted() {
    console.log(this.$slots.header); // 访问具名插槽 header 的内容
    console.log(this.$slots.default); // 访问默认插槽的内容
    console.log(this.$slots.footer); // 访问具名插槽 footer 的内容
  }
}
</script>

<!-- 被插槽组件内部 -->
<!-- 在 Vue 3 中，可以通过 useSlots api 来访问插槽内容 -->
<script setup lang="ts" name="Page">
    import { useSlots } from 'vue'
    const slots = useSlots()
    
    console.log(slots.header); // 访问具名插槽 header 的内容
    console.log(slots.default); // 访问默认插槽的内容
    console.log(slots.footer); // 访问具名插槽 footer 的内容
</script>
```

##### 12. vue-router 创建

```typescript
import { Router, createRouter, createWebHistory } from 'vue-router'
import asyncRoutesMap from '@/router/asyncRoutes'
import syncRoutesMap from '@/router/syncRoutes'

// 创建 router 使用 createRouter
// 路由模式 使用  createWebHistory(history) 或者 createWebHashHistory(hash)
const router: Router = createRouter({
  history: createWebHistory(),
  routes: syncRoutesMap,
  strict: true,
  scrollBehavior(_, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  },
})

export { asyncRoutesMap, syncRoutesMap }

export default router
```

13. ##### vue-router 在vue文件中使用

```html
<template>
  <el-button @click="consoleQuery" type="primary">console 当前路由参数</el-button>
  <el-button @click="goBack" type="primary">返回</el-button>
</template>

<script setup lang="ts">
    // setup 语法糖模式下，无法通过 this.$router 进行路由跳转等
    // useRoute(): RouteLocationNormalizedLoaded 返回当前的路由地址。相当于在模板中使用 $route。
    // useRouter(): Router 返回路由器实例。相当于在模板中使用 $router。
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute()
    const router = useRouter()

    const consoleQuery = (): void => {
        // console.log(route.params.value)
        console.log(route.query.value)
    }
    const goBack = (): void => {
        router.push('/')
    }
</script>
```

