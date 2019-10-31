const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const logger = require('./logger');
const initRoutes  = require('./src/routes');

const app = new Koa();
const router = new Router();
const port = 3000;

initRoutes(router);

app
    .use(bodyParser())
    .use(logger)
    .use(router.routes())
    .use(router.allowedMethods());

const server = app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

module.exports = server;
