const { merge } = require('webpack-merge');
const baseConfig = require('./config/webpack.base');
const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');

module.exports = (env, args) => {

    console.log(args.mode == 'development');
    if (args.mode == 'development') {
        return merge(baseConfig, devConfig);
    } else if (args.mode == 'production') {
        return merge(baseConfig, prodConfig);
    } else {
        throw new Error('No matching configuration was found!');
    }
};
