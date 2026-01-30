/* eslint-env node */
module.exports = {
  // 根级plugins平级配置所有插件，无嵌套
  plugins: {
    // 高级变量（支持$变量、条件、循环等）
    'postcss-advanced-variables': {},
    // 遍历数组/对象（each语法）
    'postcss-each': {},
    // for循环语法（和each配合使用，平级）
    'postcss-for': {},
    // 颜色混合函数（修正为正确插件名）
    // 'postcss-color-mix-function': {},
    // CSS嵌套语法（如scss的嵌套写法）
    'postcss-nested': {}
  }
};
