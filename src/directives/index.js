import { store } from '@/store'
import _ from 'lodash'

const directivesCb = (app, directives = {}) => {
  const requireDirective = import.meta.globEager('./*/*.js')
  const _directives = window.env.useMainResources?.includes('directives') ? _.cloneDeep(directives) : {}

  for (const path in requireDirective) {
    if (Object.prototype.hasOwnProperty.call(requireDirective, path)) {
      const module = requireDirective[path]
      // 处理导入的模块
      // console.log(module)
      const name = module.default.name ?? path.replace(/\.\/(.*)\/.*\.js/, '$1')
      if (!_directives?.[name]) {
        _directives[name] = module.default || module
      }
      app.use(_directives[name], store)
    }
  }
}

export { directivesCb }
