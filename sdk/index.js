const got = require('got');
const Ajv = require('ajv');

const _validateSchema = async (schema, body) => {
  console.log('body: ', body);

  const ajv = new Ajv();
  const valid = await ajv.validate(schema, body);

  if (!valid) {
    throw ajv.errors;
  }
};

const _invoker = (method, uri, schema) => {
  return async (body = {}) => {
    await _validateSchema(schema, body);
    return got[method](uri, { body, json: true });
  };
};

class DynamicSDK {
  static async discover(baseUrl) {
    const route = '.well-known/api.json';

    const { body: apiSchema } = await got.get(route, { baseUrl, json: true });
    const sdk = new DynamicSDK();

    apiSchema.forEach(endpointDefinition => {
      sdk._build(endpointDefinition);
    });

    return sdk;
  }

  _build({ resource = '', method = '', action = '', uri = '', schema = {} }) {
    console.assert(method, 'method is required');
    console.assert(resource, 'resource is required');
    console.assert(action, 'action is required');
    console.assert(uri, 'uri is required');

    this[resource] = this[resource] || {};
    this[resource][action] = _invoker(method, uri, schema);
  }
}

module.exports = { DynamicSDK };
