// vue.config.js
const path = require('path')

function resolve(dir) {
 return path.join(__dirname, '.', dir)
}

module.exports = {
  devServer:{
    proxy: {
      "/api/": {
        target: "http://47.107.160.191:8888",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: ''
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  // assetsDir: '', // 生成静态资源目录名称
  // 是否为生产环境构建生成 source map
  productionSourceMap: false,
  css: {
      // 是否使用css分离插件 ExtractTextPlugin 默认生产环境下是 true,开发环境下是 false（开发模式如果分离了就不能热加载了）
      // extract: false,
      // 开启 CSS source maps?
      extract: true,
      sourceMap: false,
      // css预设器配置项，向 CSS 相关的 loader 传递选项
      loaderOptions: {
        // 加入全局css变量
        sass: {
          prependData: `
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
      // requireModuleExtension: false
    },
  pluginOptions: {
    svgSprite: {
        /*
         * The directory containing your SVG files.
         */
        dir: 'src/assets/icons',
        /*
         * The reqex that will be used for the Webpack rule.
         */
        test: /\.(svg)(\?.*)?$/,
        /*
         * @see https://github.com/kisenka/svg-sprite-loader#configuration
         */
        loaderOptions: {
            extract: true,
            spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
        },
        /*
         * @see https://github.com/kisenka/svg-sprite-loader#configuration
         */
        pluginOptions: {
            plainSprite: true
        }    
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  },
  // 如果你想要通过 Babel 显式转译一个依赖，可以在以下数组列出来（如果需要在本地调式ie浏览器的话，就把下面的判断去掉）
  transpileDependencies: ['node_modules/element-ui/packages',
                          'node_modules/element-ui/src',
                          'src'
                        ],
  // 调整 webpack 配置（放置plugins等）
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // config.externals = {
      //   'vue': 'Vue'
      // }
    }
    // 开发生产共同配置
    Object.assign(config, {
      // 配置模块如何解析
      resolve: {
        ...config.resolve,
        // 创建 import 或 require 的别名（默认只有@为src目录）
        alias: {
          '@': path.resolve(__dirname, './src'),
          vue: 'vue/dist/vue.js'
        }
      },
      externals: {
        // 'AMap': 'window.AMap',
        // 'AMapUI': 'window.AMapUI'
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
        }
      },
      plugins: [
        ...config.plugins
      ],
      optimization: {
        ...config.optimization
      }
    })
  }
}
