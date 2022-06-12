const chokidar = require('chokidar');

function watchFile(fileList = [], callback = () => {}) {
    // 限流
    function debouce(fn, waiter) {
        let st;
        return (...args) => {
            clearTimeout(st);
            st = setTimeout(fn, waiter, ...args);
        }
    }
    const debouceCompiler = debouce(callback, 300);

    // 监听文件变化
    const watcher = chokidar.watch(fileList, {
        ignored: /node_modules/,
        persistent: true
    });

    watcher
    .on('add', path => debouceCompiler())
    .on('change', path => debouceCompiler())
    .on('unlink', path => debouceCompiler());
}

module.exports = watchFile;