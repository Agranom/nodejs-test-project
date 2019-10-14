const logger = async (ctx, next) => {
    console.log('---------------------------------------------------');
    console.log(`${new Date().toTimeString()}`);
    console.log(`${ctx.url} ${ctx.method} - request from IP - ${ctx.ip}`);
    console.log('---------------------------------------------------');
    await next();
};

module.exports = logger;
