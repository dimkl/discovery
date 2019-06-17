const Ajv = require('ajv');
const Boom = require('boom');

function validationMiddleware(schema) {
  return async (ctx, next) => {
    const method = ctx.req.method.toLowerCase();
    const data = method === 'get' ? ctx.query : ctx.req.body;

    const ajv = new Ajv();
    const valid = await ajv.validate(schema, data);

    if (!valid) {
      console.log(ajv.errors);
      throw Boom.badData('', ajv.errors);
    }

    return next();
  };
}

module.exports = { validationMiddleware };
