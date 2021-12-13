/*
 * @Author: wupeiwen <javapeiwen2010@gmail.com>
 * @Date: 2021-06-07 10:59:11
 * @LastEditors: wupeiwen <javapeiwen2010@gmail.com>
 * @LastEditTime: 2021-06-07 11:09:42
 */
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default (app) => {
  const requireComponent = require.context(
    // 其组件目录的相对路径
    '@/components/',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\w+\.(vue|jsx)$/
  )
  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
      camelCase(
        // 获取和目录深度无关的文件名
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    // 全局注册组件
    app.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    )
  })
}
