const Ajv = require('ajv');
const Boom = require('boom');

function validationMiddleware(schema) {
  return async (ctx, next) => {
    const ajv = new Ajv();
    const valid = await ajv.validate(schema, ctx.req.body);

    if (!valid) {
      console.log(ajv.errors);
      throw Boom.badData('', ajv.errors);
    }

    return next();
  };
}

module.exports = { validationMiddleware };
