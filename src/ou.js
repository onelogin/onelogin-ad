const api = require('./util/api');
const parseLocation = require('./util/parseLocation');

/**
 *  Public ou functions
 *  --------------------------
 *  findOU(ouName)
 *  ouExists(ouName)
 *  addOU({!name, location, description})
 *  removeOU(ouName)
 */

module.exports = {
  async getAllOUs(opts) {
    return new Promise(async (resolve, reject) => {
      const search = `OU=*`;
      this._search(search)
        .then(results => {
          if (!results || !results.other) {
            /* istanbul ignore next */
            return resolve([]);
          }
          let match = results.other.filter(obj => {
            return (
              String(obj.dn).split(',')[0].toLowerCase().indexOf('ou=') > -1
            );
          });
          resolve(api.processResults(opts, match));
        })
        .catch(reject);
    });
  },

  async findOU(ouName) {
    return new Promise(async (resolve, reject) => {
      const search = `OU=${ouName}`;
      this._search(search)
        .then(results => {
          if (!results || !results.other) {
            return resolve(undefined);
          }
          let match = results.other.filter(ou => {
            return (
              String(ou.dn).split(',')[0].toLowerCase() === search.toLowerCase()
            );
          });
          resolve(match[0]);
        })
        .catch(reject);
    });
  },

  async ouExists(ouName) {
    return new Promise(async (resolve, reject) => {
      return this.findOU(ouName).then(ou => {
        resolve(ou !== undefined ? true : false);
      });
    });
  },

  async addOU(opts) {
    if (typeof opts === 'string') {
      opts = { name: opts };
    }
    let { name, location, description } = opts;
    location = parseLocation(location);
    return this._addObject(`OU=${name}`, location, {
      ou: name,
      description: description,
      objectClass: 'organizationalunit'
    });
  },

  async removeOU(ouName) {
    return this._deleteObjectBySearch(`OU=${ouName}`);
  }
};
