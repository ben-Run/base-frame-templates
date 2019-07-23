// vue.config.js
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  // 本地运行设置（webpack-dev-server）
  devServer: {
    // host: '0.0.0.0', //ip地址（默认localhost）
    port: 8081, // 端口号
    progress: true, // 输出运行进度到控制台
    open: true, // 自动打开浏览器
    hot: false, // 热模块替换（默认true）
    liveReload: true, // 热刷新，在文件改变时会进行页面刷新
    watchContentBase: true, // 必须开启才能使liveReload生效（同时需要关闭hot才能生效）
    proxy: { // 配置代理
      '/app/': {
        target: 'http://120.77.202.123',
        changeOrigin: true,
        cookieDomainRewrite: ''
      }
    },
    // 当存在编译器错误或警告时，在浏览器中显示全屏覆盖
    overlay: {
      errors: true,
      warnings: true
    }
  },
  // 基本路径
  publicPath: './',
  // 打包文件目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: '',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // indexPath: 'index.html',
  // 开发模式才显示lint错误
  lintOnSave: process.env.NODE_ENV === 'development',
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
  // 如果你想要通过 Babel 显式转译一个依赖，可以在以下数组列出来（如果需要在本地调式ie浏览器的话，就把下面的判断去掉）
  transpileDependencies: process.env.NODE_ENV === 'development' ? [] : [
    'element-ui'
  ],
  // 生产环境的 source map
  productionSourceMap: true,
  // 调整 webpack 配置（放置plugins等）
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发修改配置...
      config.mode = 'development'
    }

    // 开发生产共同配置
    Object.assign(config, {
      // 配置模块如何解析
      resolve: {
        ...config.resolve,
        // 创建 import 或 require 的别名（默认只有@为src目录）
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      },
      // 配置如何展示性能提示
      performance: {
        ...config.performance,
        // 打开/关闭提示（false|'error'|'warning'）
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 100000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
        // 此属性允许 webpack 控制用于计算性能提示的文件
        assetFilter: function (assetFilename) {
          return !(/\.map$/.test(assetFilename))
          // return assetFilename.endsWith('.js') // 只给出 .js 文件的性能提示
        }
      },
      plugins: [
        ...config.plugins
      ],
      optimization: {
        ...config.optimization,
        splitChunks: {
          // chunks: "all", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
          cacheGroups: {
            // 这个项目涉及到重置UI样式的，抽出来vendors意义不大，反而会增加体积
            commons: {
              chunks: 'initial',
              minChunks: 2,
              maxInitialRequests: 5, // The default limit is too small to showcase the effect
              minSize: 0 // This is example is too small to create commons chunks
            }
          }
        }
      }
    })
  },
  // 对内部的 webpack 配置进行更细粒度的修改（修改 Loader 选项）
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 10000 // 图片少于10k转base64(默认是4k)
        return options
      })
    return config
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 默认生产环境下是 true,开发环境下是 false（开发模式如果分离了就不能热加载了）
    // extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项，向 CSS 相关的 loader 传递选项
    loaderOptions: {
      // 加入全局css变量
      sass: {
        data: `
          @import "@/styles/mixin.scss";
        `
      },
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    },
    // 启用 CSS modules
    modules: false
  }
}
