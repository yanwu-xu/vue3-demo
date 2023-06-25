import type { App } from 'vue'

const all = import.meta.globEager('./svg/*.svg')
const icons = {}

Object.keys(all).forEach(key => {
  const keyWord = key.match(/\/svg\/(.*)\.svg/)?.[1]
  if (keyWord) icons[keyWord] = all[key]
})

export function setupSvg(app: App<Element>) {
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component as any)
  }
}
