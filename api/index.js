const { join } = require('path');

const omitUndefined = obj => {
  const _obj = { ...obj };
  Object.keys(_obj).forEach(key => _obj[key] === undefined && delete _obj[key]);
  return _obj;
};

class DiscoveryAPI {
  constructor() {
    this._schema = [];
  }

  setApiBasePath(basePath) {
    this._basePath = basePath;
  }

  get route() {
    return join(this._basePath || '/', '.well-known/api.json');
  }

  get schema() {
    // TODO:  add $id to each schema using _basePath
    return this._schema;
  }

  register({ resource, method, action, uri, schema }) {
    // TODO: validate resource to be string
    // TODO: validate action to be string
    // TODO: validate action to one of http methods
    // TODO: validate uri to be URI
    // TODO: validate schema to be json schema
    this._schema.push(
      omitUndefined({
        resource,
        method,
        action,
        uri,
        schema
      })
    );
  }
}

module.exports = { DiscoveryAPI };
