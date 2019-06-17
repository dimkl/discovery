const Router = require('koa-router');
const resourceRouter = require('./resource/router');
const resource1Router = require('./resource1/router');
const exampleApiDiscovery = require('./discovery');

const router = new Router();

router.use(resourceRouter.routes());
router.use(resource1Router.routes());

exampleApiDiscovery.expose(router);

module.exports = { router };
