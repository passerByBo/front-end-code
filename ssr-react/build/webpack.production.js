const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path/posix');

module.exports = merge(common, {
    mode: 'production',
    //可以设置多入口进行分包，配置entry手动分离代码
    // module.exports = {
    //     entry: {
    //       main: './src/main.js',
    //       index: './src/index.js'
    //     },
      
    //     output: {
    //       path: path.resolve(__dirname, '../dist'),
    //       // 此时name的取值就是entry的key值
    //       // 打包后会形成 main.bundle.js 和 index.bundle.js
    //       filename: '[name].bundle.js'
    //     }
    //   },
      
    //多入口分包可以配置shared，抽离重复模块
    // entry: {
    //     main: {
    //       import: './src/main.js',
    //       // main.js 需要提取出来的依赖，值为字符串（值只能是字符串）
    //       dependOn: 'lodash'
    //     },
    //     index: {
    //       import: './src/index.js',
    //       dependOn: 'lodash'
    //     },
    //     // 抽离出来的公共模块
    //     lodash: 'lodash',
    //     dayjs: 'dayjs'
    //   },
      //可以使用动态引入的方式进行分包，react的layz也是动态分包的一种
      //js代码中import('./main').then(res => console.log(res))

    // resolve: {
    //     alias: {
    //         'rest': path.resolve(__dirname, '../node_modules/react/umd/react.production.min.js')
    //     }
    // },
    //splitChunk进行分包
    optimization: {
        minimize:true,
        //css分包压缩
        //minimizer: [new CssMinimizerPlugin(), '...'],
        //抽离运行时代码
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
        splitChunks: {
            //name: () => ,
            // chunks 可以设置的值有三个
            // 1. async 对异步(async)引入的包进行分包操作 默认值
            // 2. inital 对同步引入的包进行分包操作
            // 3. all 对所有引入的包全部进行分包操作
            // 默认情况下，所有被抽取出去的包都会合并到[id].bundle.js中
            chunks: 'all',
            // 默认值是20000Byte，表示大于这个大小的引入文件都需要抽离出来
            minSize: 20000,
            // 表示的是大于多少字节的包需要进行二次拆分，拆分为不小于minSize的包
            // 多数情况下，如果设置maxSize的值的时候，minSize和maxSize的值一般是一致的
            maxSize: 20000,
            // 某一个包引入了多少次就需要被抽离出来
            minChunks: 1,

            // cacheGroups的含义是 所有的模块输出，会存放在缓存中，最后一起执行对应的操作
            // 在这个属性里面可以自己自定义的代码分割配置
            // cacheGroups的优先级小于minSize和maxSize，所以当两种冲突的时候，cacheGroup中的配置会默认失效
            cacheGroups: {
                // key可以任意取，在这边只是一个占位符
                // value是一个配置对象
                vendor: {
                    // 正则，用以匹配对应的模块路径
                    test: /[\\/]node_modules[\\/]/,
                    // 输出文件名 输出文件会以 输出文件名-hash值.js的形式输出
                    // name: "vender",

                    // filename 输出文件名，和name不同的是，filename中可以使用placeholder
                    filename: 'scripts/vendor_[id].js',
                    // 优先级 在这个配置中约定俗称，一般设置为负数
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    filename: "common_[id].js",
                    priority: -20
                }
            }
        }
    }

})