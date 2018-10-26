const path = require('path');
const root = path.resolve(__dirname);

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode:'development',
    devtool:'source-map',
    entry: {
        app: path.join(root,'src/main.js')
    },
    output: {
        path: path.join(root,'dist'),
        publicPath: './',
        filename:'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'],{allowExternal:true}),
        new HtmlWebpackPlugin({
            title:'Output Management',
            template:path.join(root,'src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:"css/[name].[contenthash:7].css",
            chunkFilename: "css/[id].[contenthash:7].css"
            // allChunks:true
        }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         compress: {
        //             warnings: false
        //         }
        //     },
        //     sourceMap: false,
        //     parallel: true
        // }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            "window.jQuery": "jquery"
        })
    ],
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader: 'vue-loader',
                options:{
                    cssSourceMap: true,
                }
            },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    // 'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {"sourceMap":true}}
                ],

            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|iconfont.css)(\?.*)?$/,
                use:{
                    loader:'url-loader',
                    options: {
                        limit:1000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.join(root,'src'),
            'vue$':'vue/dist/vue.esm.js'
        }
    },
    optimization : {
        splitChunks:{
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    enforce:true,
                    chunks: 'initial',
                    name:'vendor'
                },
                commons: {
                    chunks: 'initial',
                    minChunks: Infinity,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name:'commons'
                },
            }
        }
    }
};