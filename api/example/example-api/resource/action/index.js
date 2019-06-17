const schema = require('./schema.json');
const handler = async (ctx, next) => {
  ctx.body = { message: 'success' };
  ctx.status = 200;
};

module.exports = { handler, schema };
