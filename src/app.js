import Koa from 'koa';
import router from './routers';

const app = new Koa();


app.use(router.allowedMethods());
app.use(router.routes());


app.listen(3000);

console.log('http://localhost:3000/')