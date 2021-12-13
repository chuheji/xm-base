/*
 * @Author: wupeiwen <javapeiwen2010@gmail.com>
 * @Date: 2021-06-07 10:32:58
 * @LastEditors: wupeiwen <javapeiwen2010@gmail.com>
 * @LastEditTime: 2021-06-07 10:56:03
 */
module.exports = (() => {
  const option = {
    publicPath: '/',
    outputDir: './dist',
    lintOnSave: true,
    runtimeCompiler: false,
    productionSourceMap: false,
    devServer: {
      open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8000,
      https: false,
      hotOnly: false,
      proxy: {}
    }
  }
  option.devServer.proxy[`${process.env.LOCATION}`] = {
    target: process.env.TARGET,
    changeOrigin: true
  }
  return option
})()
