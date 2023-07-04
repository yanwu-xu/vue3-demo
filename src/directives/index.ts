import { type App } from "vue"
import { store } from '@/store'
import _ from 'lodash'

const directivesCb = (app: App, directives = {}) => {
  const requireDirective = import.meta.globEager('./*/*.ts')
  const _directives = (window as any).env.useMainResources?.includes('directives') ? _.cloneDeep(directives) : {}

  for (const path in requireDirective) {
    if (Object.prototype.hasOwnProperty.call(requireDirective, path)) {
      const module = requireDirective[path]
      // 处理导入的模块
      const name = module.default.name ?? path.replace(/\.\/(.*)\/.*\.ts/, '$1')
      if (!_directives?.[name]) {
        _directives[name] = module.default || module
      }
      app.use(_directives[name], store)
    }
  }
}

export { directivesCb }
