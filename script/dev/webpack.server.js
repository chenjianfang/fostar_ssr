const webpack = require('webpack');
const { spawn } = require('node:child_process');
const path = require('path');
const { cwd, webpackStdout } = require('../utils/common');

// 服务端参数
const serverOptions = {
    outputPath: path.join(__dirname, '../../dist'),
    entryFile: path.join(__dirname, '../../', 'src/app.js'),
}

// 启动服务器
let child;
function reload() {
    if (child) {
        child.stdin.pause();
        child.kill();
    }

    child = spawn('node', ['app.js'], {
        cwd: serverOptions.outputPath
    })

    child.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}
process.on("exit", function (code) {
    //进行一些清理工作
    if (child) {
        child.stdin.pause();
        child.kill();
    }
});

function webpackServer() {
    // 编译node服务
    webpack({
        target: 'node',
        mode: 'development',
        entry: {
            app: serverOptions.entryFile
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
            ]
        },
        output: {
            filename: '[name].js',
            path: serverOptions.outputPath,
            publicPath: '',
            library: {
                type: 'commonjs'
            }
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        externals: {
            // react: 'React',
            'react-dom/server': 'ReactDOMServer',
        },
    }, (err, stats) => {
        webpackStdout(err, stats, {
            success: reload,
            name: 'webpack.server'
        })
    });
}

module.exports = webpackServer;