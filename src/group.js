const api = require('./util/api');
const parseLocation = require('./util/parseLocation');

/**
 *  Public group functions
 *  --------------------------
 *  getAllGroups(opts)
 *  findGroup(groupName, opts)
 *  addGroup(opts)
 *  addUserToGroup(userName, groupName)
 *  removeUserFromGroup(userName, groupName)
 *  removeGroup(groupName)
 */

module.exports = {
  async getAllGroups(opts) {
    return await this._findByType(opts, ['group']);
  },

  async findGroup(groupName, opts) {
    groupName = String(groupName || '');
    return new Promise(async (resolve, reject) => {
      groupName =
        groupName.indexOf('@') > -1 ? groupName.split('@')[0] : groupName;
      if (groupName.trim() === '') {
        /* istanbul ignore next */
        return reject(`${groupName} is not a valid Group name.`);
      }
      const filter = `(|(cn=${groupName}))`;
      const config = {
        filter,
        includeDeleted: false
      };
      try {
        this.ad.find(config, async (err, results) => {
          if (err) {
            /* istanbul ignore next */
            return reject(err);
          }
          if (!results || !results.groups || results.groups.length < 1) {
            return resolve({});
          }
          results.groups = api.processResults(opts, results.groups);
          return resolve(results.groups[0]);
        });
      } catch (e) {
        /* istanbul ignore next */
        reject(e);
      }
    });
  },

  async groupExists(groupName) {
    return new Promise(async (resolve, reject) => {
      this.findGroup(groupName)
        .then(groupObject => {
          let exists = !groupObject || !groupObject.dn ? false : true;
          resolve(exists);
        })
        .catch(reject);
    });
  },

  async addGroup(opts) {
    if (typeof opts === 'string') {
      opts = { name: opts };
    }
    let { name, location, description } = opts;
    location = parseLocation(location);
    return this._addObject(`CN=${name}`, location, {
      cn: name,
      description: description,
      objectClass: 'group',
      sAmAccountName: name
    });
  },

  async addUserToGroup(userName, groupName) {
    return new Promise(async (resolve, reject) => {
      this.findUser(userName).then(userObject => {
        if (Object.keys(userObject).length < 1) {
          /* istanbul ignore next */
          return reject({
            error: true,
            message: `User ${userName} does not exist.`
          });
        }
        this._groupAddOperation(groupName, {
          member: [userObject.dn]
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            /* istanbul ignore next */
            reject(Object.assign(err, { error: true }));
          });
      });
    });
  },

  async removeUserFromGroup(userName, groupName) {
    return new Promise(async (resolve, reject) => {
      this.findUser(userName).then(userObject => {
        if (Object.keys(userObject).length < 1) {
          /* istanbul ignore next */
          return reject({ error: true, message: 'User does not exist.' });
        }
        this._groupDeleteOperation(groupName, {
          member: [userObject.dn]
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            /* istanbul ignore next */
            reject(Object.assign(err, { error: true }));
          });
      });
    });
  },

  async removeGroup(groupName) {
    return new Promise(async (resolve, reject) => {
      this.findGroup(groupName)
        .then(groupObject => {
          if (Object.keys(groupObject).length < 1) {
            return reject({
              error: true,
              message: `Group ${groupName} does not exist.`
            });
          }
          return this._deleteObjectByDN(groupObject.dn);
        })
        .then(resp => {
          return resolve(resp);
        })
        .catch(reject);
    });
  }
};
