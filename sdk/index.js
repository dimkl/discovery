const got = require('got');
const Ajv = require('ajv');
const { join } = require('path');
const queryString = require('query-string');

const _validateSchema = async (schema, body) => {
  const ajv = new Ajv();
  const valid = await ajv.validate(schema, body);

  if (!valid) {
    throw ajv.errors;
  }
};

const _invoker = (method, uri, schema, baseUrl) => {
  return async (body = {}) => {
    await _validateSchema(schema, body);
    if (method === 'get') {
      const query = queryString.stringify(body);
      return got[method](uri, { query, baseUrl });
    } else {
      return got[method](uri, { body, baseUrl, json: true });
    }
  };
};

class DynamicSDK {
  constructor(baseUrl) {
    console.assert(baseUrl, 'baseUrl is required');
    this.baseUrl = baseUrl;
  }

  static async discover(baseUrl) {
    const route = '.well-known/api.json';

    const { body: apiSchema } = await got.get(route, { baseUrl, json: true });
    const sdk = new DynamicSDK(baseUrl);

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

    method = method.toLowerCase();

    this[resource] = this[resource] || {};
    this[resource][action] = _invoker(
      method.toLowerCase(),
      uri,
      schema,
      this.baseUrl
    );
  }
}

module.exports = { DynamicSDK };
