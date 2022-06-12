import Router from '@koa/router';
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import nodeEval from 'node-eval';
import React from 'react';

const router = new Router();

router.get('(.*)', async (ctx, next) => {
    let pathStr = Object.values(ctx.params)[0];
    if (pathStr === '/') {
        pathStr = 'index';
    }
    const page = path.join(__dirname, 'server', pathStr) + '.js';
    const hasPagePath = fse.pathExistsSync(page);

    if (hasPagePath) {
        const codeStr = fs.readFileSync(page, 'utf-8');
        const { App, ReactDOMServer, getServerSideProps } = nodeEval(codeStr, page);
        const { props = {} } = await getServerSideProps();
        const htmlStr = ReactDOMServer.renderToString(<App {...props} />)
        return ctx.body = htmlStr;
    }

    ctx.body = 'xx';
});

export default router;