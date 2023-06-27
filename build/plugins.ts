import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import { viteMockServe } from 'vite-plugin-mock'
import DefineOptions from 'unplugin-vue-define-options/vite'
import liveReload from 'vite-plugin-live-reload'
import ElementPlus from 'unplugin-element-plus/vite'
import removeConsole from 'vite-plugin-remove-console'

export function getPluginsList(command) {
  const prodMock = true
  return [
    vue(),
    DefineOptions(),
    // jsx、tsx语法支持
    vueJsx(),
    WindiCSS(),
    // 线上环境删除console
    removeConsole(),
    // 修改layout文件夹下的文件时自动重载浏览器 解决 https://github.com/xiaoxian521/vue-pure-admin/issues/170
    liveReload(['src/layout/**/*', 'src/router/**/*']),
    // svg组件化支持
    svgLoader(),
    ElementPlus({}),
    // mock支持
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
      prodEnabled: command !== 'serve' && prodMock,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: true,
    }),
  ]
}
