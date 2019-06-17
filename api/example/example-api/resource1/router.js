const Router = require('koa-router');
const discoveryApi = require('../discovery');
const { validationMiddleware } = require('../../../../validation');
const { resourceActionPath } = require('./paths');
const { schema, handler } = require('./action');

const router = new Router();

router.get(resourceActionPath(), validationMiddleware(schema), handler);
discoveryApi.register({
  resource: 'resource1',
  action: 'action',
  method: 'get',
  uri: resourceActionPath(),
  schema
});

module.exports = router;
