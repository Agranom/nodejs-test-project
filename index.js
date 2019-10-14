const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const logger = require('./logger');

const app = new Koa();
const router = new Router();
const port = 3000;

router
    .get('/users', (ctx) => {
        ctx.body = 'Some route is available';
    })
    .post('/users',  (ctx) => {
        ctx.body = ctx.request.body;
    });

app
    .use(bodyParser())
    .use(logger)
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
