module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://localhost:5001/api',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => { }
  }
}
