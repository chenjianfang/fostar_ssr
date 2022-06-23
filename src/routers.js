import Router from '@koa/router';
import path from 'path';
import fse from 'fs-extra';
import render from './render';

const router = new Router();

router.get('(.*)', async (ctx, next) => {
    let pathStr = Object.values(ctx.params)[0];
    if (pathStr === '/') {
        pathStr = 'index';
    }
    const pageFile = path.join(__dirname, 'server', pathStr);
    const hasPagePath = fse.pathExistsSync(pageFile);

    if (hasPagePath) {
        const htmlStr = await render(pageFile, ctx);
        return ctx.body = htmlStr;
    } else {
        next();
    }
});

export default router;