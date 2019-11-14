module.exports = {
    devServer: {
      proxy: {
        '^/v1': {
          target: 'http://modi.minerba.esdm.go.id:8020',
          ws: true,
          changeOrigin: true
        },
      }
    }
  }