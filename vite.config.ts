import { resolve } from 'path'
import { warpperEnv } from './build'
import { getPluginsList } from './build/plugins'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'

// 当前执行node命令时文件夹的地址（工作目录）
const root: string = process.cwd()

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@build': pathResolve('build'),
  //解决开发环境下的警告
  // "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
}

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_PUBLIC_PATH } = warpperEnv(loadEnv(mode, root))
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`, //公共样式地址
        },
      },
      // https://github.com/vitejs/vite/issues/5833
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    // 服务端渲染
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      host: '0.0.0.0',
      // 本地跨域代理
      //   proxy:
      //     VITE_PROXY_DOMAIN_REAL.length > 0
      //       ? {
      //           [VITE_PROXY_DOMAIN]: {
      //             target: VITE_PROXY_DOMAIN_REAL,
      //             // ws: true,
      //             changeOrigin: true,
      //             rewrite: (path: string) => regExps(path, VITE_PROXY_DOMAIN),
      //           },
      //         }
      //       : null,
    },
    plugins: getPluginsList(command),
    optimizeDeps: {
      include: [
        'pinia',
        // "vue-i18n",
        // "lodash-es",
        // "@vueuse/core",
        // "@iconify/vue",
        // "element-plus/lib/locale/lang/en",
        // "element-plus/lib/locale/lang/zh-cn",
        // "vxe-table/lib/locale/lang/zh-CN",
        // "vxe-table/lib/locale/lang/en-US"
      ],
      exclude: ['@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'],
    },
    build: {
      sourcemap: false,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  }
}
