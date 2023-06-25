module.exports = {
  // 超过最大值换行
  printWidth: 100,
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: false,
  // 在语句末尾打印分号
  semi: false,
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: true,
  // 使用单引号而不是双引号
  singleQuote: true,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  // “as- needed” - 仅在必需的对象属性周围添加引号。
  // “consistent” - 如果对象中的至少一个属性需要引号，请引用所有属性。
  // “preserve” - 尊重对象属性中引号的输入使用。
  quoteProps: 'as-needed',
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: 'es5',
  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  jsxBracketSameLine: false,
  // 在jsx中使用单引号代替双引号
  jsxSingleQuote: false,
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid',
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 换行设置 always\never\preserve
  proseWrap: 'never',
  // 为 HTML，Vue，Angular 和 Suppherbars 指定全局空白的灵敏度
  // “css” - 尊重 CSS 显示属性的默认值。 对于处理与严格相同的把手。
  // “strict” - 所有标签周围的空白（或缺乏）被认为是显着的。
  // “ignore” - 所有标签周围的空格（或缺乏）被认为是微不足道的。
  htmlWhitespaceSensitivity: 'strict',
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'auto',
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
}
