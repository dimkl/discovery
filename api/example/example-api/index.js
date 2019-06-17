const Router = require('koa-router');
const resourceRouter = require('./resource/router');
const resource1Router = require('./resource1/router');
const exampleApiDiscovery = require('./discovery');

const router = new Router();

router.use(resourceRouter.routes());
router.use(resource1Router.routes());

router.get(exampleApiDiscovery.route, (ctx, next) => {
  ctx.body = exampleApiDiscovery.schema;
  return next();
});

module.exports = { router };
