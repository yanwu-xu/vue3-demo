import type { App } from 'vue'

const all = import.meta.globEager('./*/index.vue')
const components = {}

Object.keys(all).forEach(key => {
  const keyWord = key.match(/\/(.*)\/index\.vue/)?.[1]
  if (keyWord) components[keyWord] = all[key]
})

export function setupComponents(app: App<Element>) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, (component as any).default)
  }
}
