const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')

const devWebpackConfig = merge(baseWebpackConfig, {
    // DEV settings gonna be here
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.build,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 3000,
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
    ]
})

// export devWebpackConfig
module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
}) 