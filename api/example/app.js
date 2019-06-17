const Koa = require('koa');
const { router: apiRouter } = require('./example-api');

const app = new Koa();

app.use((ctx, next) => {
  console.log(`${Date.now()} => ${ctx.req.method} ${ctx.request.href}`);
  return next();
});

app.use(async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    console.error(err);
    ctx.body = error.output;
  }
});

app.use((ctx, next) => {
  ctx.query = Object.keys(ctx.query).reduce((a, b) => {
    a[b] = decodeURIComponent(ctx.query[b]);
    return a;
  }, {});

  return next();
});

app.use(apiRouter.routes());

app.listen(8080);

console.log(apiRouter.stack.map(i => i.path));

module.exports = app;
