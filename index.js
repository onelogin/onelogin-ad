const activedirectory = require('activedirectory');
const configFile = require('./config.json');

const imports = {
  user: require('./src/user'),
  group: require('./src/group'),
  ou: require('./src/ou'),
  others: require('./src/others'),
  helpers: require('./src/internal/helpers'),
  operations: require('./src/internal/operations'),
  chainable: require('./src/chainable')
};

class AD {
  constructor(config) {
    if (config === undefined) {
      throw new Error('Configuration is required.');
    }

    let invalid = !config.url || !config.user || !config.pass;

    if (invalid) {
      throw new Error(
        'The following configuration is required: {url, user, pass}.'
      );
    }

    if (String(config.url).indexOf('://') === -1) {
      throw new Error(
        'You must specify the protocol in the url, such as ldaps://127.0.0.1.'
      );
    }

    if (String(config.user).indexOf('@') === -1) {
      throw new Error(
        'The user must include the fully qualified domain name, such as joe@acme.co.'
      );
    }

    config.domain = String(config.user).split('@')[1];

    if (config.baseDN === undefined) {
      config.baseDN = config.domain.split('.').map(n => `DC=${n}`).join(',');
    }

    config = Object.assign(configFile, config);

    this.config = config;

    this._cache = {
      enabled: true,
      expiration: 600000,
      users: {},
      groups: {},
      ous: {},
      all: {},
      get: (type, key) => {
        if (!this._cache.enabled) {
          return undefined;
        }
        if (!this._cache[type] || !this._cache[type][key]) {
          return undefined;
        }
        let obj = this._cache[type][key];
        let diff = new Date() - obj.timestamp;
        if (diff > this._cache.expiration) {
          delete this._cache[type][key];
          return undefined;
        }
        return obj.value;
      },
      set: (type, key, value) => {
        this._cache[type][key] = {
          timestamp: new Date(),
          value
        };
      }
    };

    this.ad = new activedirectory({
      url: config.url,
      baseDN: config.baseDN,
      username: config.user,
      password: config.pass,
      tlsOptions: {
        rejectUnauthorized: false
      }
    });
  }

  cache(bool) {
    this._cache.enabled = bool;
    return this;
  }

  cacheTimeout(millis) {
    this._cache.expiration = millis;
    return this;
  }
}

const loadImports = () => {
  for (const key in imports) {
    let file = imports[key];
    for (const fn in file) {
      AD.prototype[fn] = file[fn];
    }
  }
};

loadImports();

module.exports = AD;
