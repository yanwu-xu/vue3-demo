import { nextTick } from 'vue'
const has = {
  name: 'has',
  // 所有类型修饰符
  types: ['show', 'click', 'clickChild', 'move', 'moveChild'],
  // 初始化数据
  initData(el, binding, data) {
    const code = typeof binding.value === 'string' ? binding.value : binding.value.code

    const childNode = binding.value === 'string' ? '' : binding.value.childNode

    const cursorStyle =
      binding.value === 'string' || !binding.value.cursorStyle ? 'not-allowed' : binding.value.cursorStyle

    let modifiers = Object.keys(binding.modifiers).filter(key => has.types.includes(key))
    modifiers = modifiers.length && !modifiers.includes('show') ? modifiers : ['show']

    let elements =
      data && data.getters && data.getters.elements
        ? data.getters.elements
        : data && data.elements
          ? data.elements
          : data

    elements = Array.isArray(elements) ? elements : Object.keys(elements)

    const cursorClass =
      typeof binding.value === 'string' || !binding.value.cursorClass
        ? ['.v-cursor-auto']
        : typeof binding.value.cursorClass === 'string'
          ? ['.v-cursor-auto', binding.value.cursorClass]
          : ['.v-cursor-auto', ...binding.value.cursorClass]

    const allowClickClass =
      typeof binding.value === 'string' || !binding.value.allowClickClass
        ? ['.v-click-allow']
        : typeof binding.value.allowClickClass === 'string'
          ? ['.v-click-allow', binding.value.allowClickClass]
          : ['.v-click-allow', ...binding.value.allowClickClass]

    return { el, modifiers, elements, code, cursorClass, childNode, allowClickClass, cursorStyle }
  },
  // 设置光标样式
  setStyle(el, cursorClass, cursorStyle) {
    el.style.cursor = cursorStyle
    cursorClass.forEach(className => {
      const nodeList = el.querySelectorAll(className)
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.cursor = cursorStyle
      }
    })
  },
  // 判断是否可点击
  keepClick(currEl, allowClickClass, endNode) {
    const currClassName = currEl.getAttribute('class')
    if (currClassName && allowClickClass.some(item => currClassName.includes(item))) {
      return true
    } else if (currEl === endNode || currEl.parentNode === document.body) {
      return false
    } else {
      return has.keepClick(currEl.parentNode, allowClickClass, endNode)
    }
  },
  // 阻止click事件
  stopClick(e) {
    let allowClickClass = []
    let endNode = null
    for (let i = 0; i < e.path.length; i++) {
      if (e.path[i] === document.body) break
      const dataAttr = e.path[i].getAttribute('data-allow-click-class')
      if (dataAttr) {
        allowClickClass = JSON.parse(dataAttr).map(item => item.replace('.', ''))
        endNode = e.path[i]
        break
      }
    }
    if (allowClickClass.length && has.keepClick(e.target, allowClickClass, endNode)) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
  },
  // 阻止拖拽事件
  stopMove(e) {
    e.preventDefault()
    e.stopPropagation()
  },
  // 不显示
  unshow(params) {
    const { el } = params

    el.remove()
  },
  // 不可点击
  unclick(params) {
    const { el, cursorClass, allowClickClass, cursorStyle } = params

    // 将可点击的子节点的class保存到当前到的data-allow-click-class属性中
    el.setAttribute('data-allow-click-class', JSON.stringify(allowClickClass))
    el.addEventListener('click', has.stopClick, true)
    has.setStyle(el, cursorClass, cursorStyle)
  },
  // 不可点击子节点
  unclickChild(params) {
    const { el, childNode, allowClickClass, cursorClass, cursorStyle } = params
    const nodeList = typeof childNode === 'string' ? el.querySelectorAll(childNode) : childNode

    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].setAttribute('data-allow-click-class', JSON.stringify(allowClickClass))
      nodeList[i].removeEventListener('click', has.stopClick)
      nodeList[i].addEventListener('click', has.stopClick, true)
      has.setStyle(nodeList[i], cursorClass, cursorStyle)
    }
  },
  // 不可拖拽
  unmove(params) {
    const { el, cursorClass, cursorStyle } = params

    el.addEventListener('mousedown', has.stopMove, true)
    has.setStyle(el, cursorClass, cursorStyle)
  },
  // 不可拖拽子节点
  unmoveChild(params) {
    const { el, childNode, cursorClass, cursorStyle } = params
    const nodeList = typeof childNode === 'string' ? el.querySelectorAll(childNode) : childNode

    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].removeEventListener('mousedown', has.stopMove)
      nodeList[i].addEventListener('mousedown', has.stopMove, true)
      has.setStyle(nodeList[i], cursorClass, cursorStyle)
    }
  },
  install(vue, data) {
    vue.directive(has.name, {
      mounted(el, binding) {
        const params = has.initData(el, binding, data)
        const { elements, code, modifiers } = params
        if (!elements.includes(code)) {
          modifiers.forEach(key => {
            has['un' + key](params)
          })
        }
      },
      updated(el, binding) {
        const params = has.initData(el, binding, data)
        const { elements, code, modifiers } = params

        if (!elements.includes(code)) {
          nextTick(() => {
            ;['clickChild', 'moveChild'].forEach(key => {
              if (modifiers.includes(key)) has['un' + key](params)
            })
          })
        }
      }
    })
  }
}

export default has
