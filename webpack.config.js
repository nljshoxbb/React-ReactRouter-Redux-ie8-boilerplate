'use strict';
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var outputPath;
var entryPath;
var isProduction = process.env.NODE_ENV === 'production' ? true : false;

var arg = process.argv[process.argv.length - 1];
switch (arg) {
    case "--otherview":
        outputPath = path.resolve(__dirname, './otherDist');
        entryPath = path.resolve(__dirname, './src/otherView');
        break;
    case "--pc":
        outputPath = path.resolve(__dirname, './dist');
        entryPath = path.resolve(__dirname, './src/view');
        break;
    default:

        break;
}

var entris = fs.readdirSync(entryPath).reduce(function (o, filename) {
    !/\./.test(filename) && (o[filename] = path.join(entryPath, filename, 'index'));
    return o;
}, {});

entris.commons = [
    "es5-shim",
    'es5-shim/es5-sham',
    "es6-promise",
    "console-polyfill",
    "react",
    "react-dom",
    "react-router"
];

var plugins = [

    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'js/commons.js',
    }),
    new webpack.ProvidePlugin({
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        React: 'react',
        ReactDOM: 'react-dom',
        ReactRouter: 'react-router',
    }),
    new ExtractTextPlugin('css/[name].css', { allChunks: true }),

    new HtmlWebpackPlugin({
        inject: false,
        // chunks: ['commons', 'app'],
        template: './index.html',
        filename: './index.html'
    }),
]

if (isProduction) {
    plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/,
            compress: {
                warnings: false,
                ie8: true
            },
        })
    )
}

module.exports = {
    cache: true,
    entry: entris,
    output: {
        path: outputPath,
        filename: 'js/[name].bundle.js',
        publicPath: '/dist/',
        chunkFilename: 'js/[name].chunk.js',
    },
    module: {
        noParse: [/moment.js/],
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, './src/components'),
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader!sass-loader')
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, './src/pages'),
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader!sass-loader')
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, './src/sass/common'),
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, './node_modules/antd'),
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, './node_modules/antd'),
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=25000',  // 图片小于一定值的话转成base64
            },
        ],
        postLoaders: [{
            test: /(\.jsx|\.js)$/,
            loaders: ['es3ify-loader'],
        },],
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        // pxtorem({ rootValue: 100, propWhiteList: [] })
    ],
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    devtool: isProduction ? null : 'source-map',
    externals: {},
}