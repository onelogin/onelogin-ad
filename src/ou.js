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
  defaultAttributes: ['dn', 'whenCreated', 'description', 'name'],

  async getAllOUs(opts) {
    return new Promise(async (resolve, reject) => {
      const filter = `OU=*`;
      this._search({ filter })
        .then(results => {
          if (!results || !results.other) {
            /* istanbul ignore next */
            return resolve([]);
          }
          let match = results.other.filter(obj => {
            return (
              String(obj.dn)
                .split(',')[0]
                .toLowerCase()
                .indexOf('ou=') > -1
            );
          });
          resolve(api.processResults(opts, match));
        })
        .catch(reject);
    });
  },

  async findOU(ouName) {
    return new Promise(async (resolve, reject) => {
      const filter = `OU=${ouName}`;
      const opts = { attributes: this.defaultAttributes };
      this._search({ filter, opts })
        .then(results => {
          if (!results || !results.other) {
            return resolve(undefined);
          }
          let match = results.other.filter(ou => {
            return (
              String(ou.dn)
                .split(',')[0]
                .toLowerCase() === filter.toLowerCase()
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
  },

  async updateOU(dn, ouData) {
    return new Promise((resolve, reject) => {
      const operations = [];
      for (const name in ouData) {
        let value = ouData[name];
        operations.push({
          [name]: value
        });
      }

      this._replaceOperations(dn, operations)
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },

  async renameOU(oldName, newName) {
    return new Promise(async (resolve, reject) => {
      this.findOU(oldName)
        .then(adOU => {
          if (Object.keys(adOU).length < 1) {
            return reject({ error: true, message: 'OU does not exist.' });
          }
          const ouDNParts = adOU.dn.split(',');
          const regEx = new RegExp(oldName, 'ig');
          ouDNParts[0] = ouDNParts[0].replace(regEx, newName);
          const newDN = ouDNParts.join(',');

          this._modifyDN(adOU.dn, newDN)
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};
