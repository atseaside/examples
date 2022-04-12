import path from 'path';
import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const resolve = (p: string) => path.resolve(__dirname, p);

class GenerateWebpackEntry {
    dirnameArr: string[] = [];
    entry: { [key: string]: string } = {};
    constructor() {
        this.init();
    }
    init() {
        glob.sync('./src/pages/**/index.ts').forEach((n) => {
            const reg = /\.\/src\/pages\/(.+)\/index.ts/;
            const dirname = n.replace(reg, '$1');
            this.dirnameArr.push(dirname);
            this.entry = { ...this.entry, [dirname]: n };
        }, {});
    }
}

const webpackEntry = new GenerateWebpackEntry();

export const entry = webpackEntry.entry;

export const setHTMLPlugins = () => {
    return webpackEntry.dirnameArr.reduce(
        (arr: HtmlWebpackPlugin[], dirname: string) => [
            ...arr,
            new HtmlWebpackPlugin({
                favicon: resolve('src/assets/favicon.ico'),
                template: resolve(`src/pages/${dirname}/index.html`),
                chunks: [dirname],
                filename: `${dirname}.html`,
            }),
        ],
        []
    );
};
