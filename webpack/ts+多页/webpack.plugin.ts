import fs from 'fs';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const multiplePagesEntry = path.resolve(__dirname, './src/pages');
const multiplePagesDir = fs.readdirSync(multiplePagesEntry);

if (multiplePagesDir?.length < 1) {
    throw new Error('无入口文件，请检查src/pages文件夹');
}

export const getEntry = () =>
    multiplePagesDir.reduce(
        (o: { [key: string]: string }, n) => ({
            ...o,
            ...{ [n]: `${multiplePagesEntry}/${n}/index.js` },
        }),
        {}
    );

export const setHTMLPlugins = () => {
    return multiplePagesDir.reduce(
        (arr: HtmlWebpackPlugin[], item: string) => [
            ...arr,
            new HtmlWebpackPlugin({
                template: `./src/pages/${item}/index.html`,
                chunks: [item],
                filename: `${item}.html`,
            }),
        ],
        []
    );
};
