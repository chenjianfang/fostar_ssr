const path = require('path');
const glob = require("glob")

const webpackPageClient = require('./dev/webpack.page.client');
const webpackPageServer = require('./dev/webpack.page.server');
const webpackServer = require('./dev/webpack.server');
const watchFile = require('./utils/watchFile');
const { cwd } = require('./utils/common');

// 页面入口文件
const pageFile = 'page.js';

// 编译
function compiler() {
    // 编译前端资源
    glob(`src/pages/**/${pageFile}`, {
        cwd: path.join(__dirname, '../'),
    }, function (err, files) {
        console.log(files);

        const entryObj = {};
        files.forEach((pathStr) => {
            const reg = new RegExp(`pages\/(.*)(?=\/${pageFile})`);
            const name = pathStr.match(reg)[1];
            if (name) {
                entryObj[name] = path.join(cwd, pathStr);
            }
        });

        webpackServer();
        webpackPageClient(entryObj);
        webpackPageServer(entryObj);

    })
}

watchFile([
    path.join(__dirname, '.'),
    path.join(__dirname, '../src')
], compiler)