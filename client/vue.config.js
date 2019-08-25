const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001'
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@scss/config.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@api': path.resolve(__dirname, 'src/api'),
        '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
        '@scss': path.resolve(__dirname, 'src/assets/scss'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/components'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@mixins': path.resolve(__dirname, 'src/mixins'),
      }
    }
  },
};