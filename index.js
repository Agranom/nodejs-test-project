const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const port = 3000;

router
    .get('/some', (ctx) => {
        ctx.body = 'Some route is available';
    })
    .post('/some',  (ctx) => {
        ctx.body = ctx.request.body
    });

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

process.on('SIGINT', () => {
    console.log('Get ready to exit');
    process.exit();
});
