// 当前命令行运行目录
const cwd = process.cwd();

// webpack构建输出
function webpackStdout(err, stats, {
    name = '',
    fail = () => {},
    success = () => {},
} = {}) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
    }
    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
        fail();
    } else if (stats.hasWarnings()) {
        console.warn(info.warnings);
        fail();
    } else {
        console.log(`-----${name} 编译成功-------`)
        console.log(stats.toString({
            chunks: false,  // 使构建过程更静默无输出
            colors: true    // 在控制台展示颜色
        }));
        success();
    }
}

module.exports = {
    cwd,
    webpackStdout,
}