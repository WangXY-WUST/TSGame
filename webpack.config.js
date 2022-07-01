const path = require('path') // 引用path模块
// 引入heml插件，在下面使用后，就可以在打包后自动生成html文件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件，这样在每次打包后，都会删除原来build文件夹下的内容，重新生成新的、
const {CleanWebpackPlugin} = require('clean-webpack-plugin');



module.exports = {  // 这里是commrnt.js语法
    // 入口文件
    entry:"./src/index.ts",
    // 打包后的出口文件
    output:{
        // 输出的路径  是绝对路径(导入path模块) 这里是用node来做的
        path:path.resolve(__dirname,'build'),
        // 输出的文件名称
        filename:'build.js',

        environment:{
            arrowFunction:false
        }
    },
    mode: "development",
    // webpack打包时要使用的模块 
    module: {
        // 指定加载的规则
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie":"11"
                                        },
                                        // 指定corejs版本
                                        "corejs":"3",
                                        // 使用corejs的方式，usage表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    } ,
                    // （用ts-loader处理以ts结尾的文件）
                    "ts-loader",
                ],
                // 要排除的文件夹
                exclude: /node-modules/
            },
             
            // 设置less文件的处理
            {
                test:/\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 配置webpack插件
    plugins: [
        // 使用clean插件 
        new CleanWebpackPlugin,
        // 打包后自动生成一个html文件
        new HTMLWebpackPlugin({
            // 配置生成的html文件的title
            title:"自动生成的html文件" ,
            // 可以为自动生成的html选择一个模板
            template:'./src/index.html'
        }),
    ],
    // 用来设置引用模块，因为如果ts的文件的模块，如果在其他文件中引用了，就会报错，所以这里需要设置
    resolve: {
        extensions: ['.ts' , '.js']
    }
}