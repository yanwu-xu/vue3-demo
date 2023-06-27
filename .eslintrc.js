// https://blog.csdn.net/weixin_44867717/article/details/128167846
// @ts-check
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  /* 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    // setup 语法糖校验
    'vue/script-setup-uses-vars': 'error',
    // 禁止使用 @ts-ignore
    '@typescript-eslint/ban-ts-ignore': 'off',
    // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 禁止使用 any 类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 不允许在 import 语句中使用 require 语句
    '@typescript-eslint/no-var-requires': 'off',
    // 禁止空函数
    '@typescript-eslint/no-empty-function': 'off',
    // 为自定义事件名称强制使用特定大小写
    'vue/custom-event-name-casing': 'off',
    // 禁止在 函数/类/变量 定义之前使用它们
    'no-use-before-define': 'off',
    // 禁止在变量定义之前使用它们
    '@typescript-eslint/no-use-before-define': 'off',
    // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    '@typescript-eslint/ban-ts-comment': 'off',
    // 禁止使用特定类型
    '@typescript-eslint/ban-types': 'off',
    // 不允许使用后缀运算符的非空断言(!)
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 不允许使用后缀运算符的非空断言(!)
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 禁止定义未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'off',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': 'off',
    // vue api使用顺序，强制执行属性顺序
    'vue/attributes-order': 'off',
    // 强制每个组件都应该在自己的文件中
    'vue/one-component-per-file': 'off',
    // 在标签的右括号之前要求或禁止换行
    'vue/html-closing-bracket-newline': 'off',
    // 强制每行的最大属性数
    'vue/max-attributes-per-line': 'off',
    // 在多行元素的内容之前和之后需要换行符
    'vue/multiline-html-element-content-newline': 'off',
    // 在单行元素的内容之前和之后需要换行符
    'vue/singleline-html-element-content-newline': 'off',
    // 对模板中的自定义组件强制执行属性命名样式
    'vue/attribute-hyphenation': 'off',
    // 此规则要求为每个 prop 为必填时，必须提供默认值
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
  // globals: {
  //   defineOptions: 'writable'
  // }
})
