const schema = require('./schema.json');
const handler = async (ctx, next) => {
  return next();
};

module.exports = { handler, schema };
