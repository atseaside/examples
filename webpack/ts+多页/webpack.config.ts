import * as Webpack from 'webpack';
import path from 'path';

// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

import { entry, setHTMLPlugins } from './webpack.plugin';

const resolve = (p: string) => path.resolve(__dirname, p);

const config: Webpack.Configuration = {
    mode: 'development',
    entry,
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[fullhash:8].js',
        clean: true,
    },
    plugins: [...setHTMLPlugins()],
    devServer: {
        port: 8088,
    },
};

export default config;
