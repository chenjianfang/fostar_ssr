import Koa from 'koa';
const serve = require('koa-static');

import router from './routers';

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  app.use(serve('./client'));
}

app.use(router.allowedMethods());
app.use(router.routes());


app.listen(3000);

console.log('http://localhost:3000/')