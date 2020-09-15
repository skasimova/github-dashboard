const { merge } = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
    // BUILD settings gonna be here
    mode: 'production',
    plugins: [new CleanWebpackPlugin()],
});

// export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
})