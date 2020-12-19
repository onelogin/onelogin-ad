const ldap = require('ldapjs');

/**
 *  Private operations functions
 *  --------------------------
 *  _operation(objectString, operation)
 *  _operationByUser(user, operation)
 *  _operationByGroup(group, operation)
 *  _groupAddOperation(groupName, modification)
 *  _groupDeleteOperation(groupName, modification)
 *  _userReplaceOperation(user, modification)
 */

module.exports = {
  async _operation(objectString, operation) {
    return new Promise(async (resolve, reject) => {
      const [error, client] = await this._getBoundClient();
      if (error) {
        /* istanbul ignore next */
        return reject(error);
      }
      operation = Array.isArray(operation) ? operation : [operation];
      const operations = operation.map(op => new ldap.Change(op));
      client.modify(objectString, operations, (error3, data) => {
        client.unbind();
        if (error3) {
          /* istanbul ignore next */
          return reject(error3);
        }
        return resolve({ success: true });
      });
    });
  },

  async _operations(objectString, operations) {
    return new Promise(async (resolve, reject) => {
      const [error, client] = await this._getBoundClient();
      if (error) {
        /* istanbul ignore next */
        return reject(error);
      }
      operations = Array.isArray(operations) ? operations : [operations];
      const changes = operations.map(op => new ldap.Change(op));
      client.modify(objectString, changes, (error3, data) => {
        client.unbind();
        if (error3) {
          /* istanbul ignore next */
          return reject(error3);
        }
        return resolve({ success: true });
      });
    });
  },

  async _operationByUser(userName, operation, opts) {
    return new Promise(async (resolve, reject) => {
      const domain = this.config.domain;
      userName = `${userName}@${domain}`;
      this.findUser(userName, opts)
        .then(async adUser => {
          if (!adUser || !adUser.dn) {
            return reject({ message: `User ${userName} does not exist.` });
          }
          this._operation(adUser.dn, operation)
            .then(data => {
              delete this._cache.users[userName];
              resolve({ ...adUser, success: true });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  async _operationsByUser(userName, operations, opts) {
    return new Promise(async (resolve, reject) => {
      const domain = this.config.domain;
      userName = `${userName}@${domain}`;
      this.findUser(userName, opts)
        .then(async adUser => {
          if (!adUser || !adUser.dn) {
            /* istanbul ignore next */
            return reject({ message: `User ${userName} does not exist.` });
          }
          this._operations(adUser.dn, operations)
            .then(data => {
              delete this._cache.users[userName];
              resolve(adUser);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  async _operationByGroup(groupName, operation) {
    return new Promise(async (resolve, reject) => {
      this.findGroup(groupName)
        .then(async groupObject => {
          if (!groupObject || Object.keys(groupObject).length < 1) {
            /* istanbul ignore next */
            return reject({ message: `Group ${groupName} does not exist.` });
          }
          return this._operation(groupObject.dn, operation);
        })
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });
  },

  async _groupAddOperation(groupName, modification) {
    return this._operationByGroup(groupName, {
      operation: 'add',
      modification
    });
  },

  async _groupDeleteOperation(groupName, modification) {
    return this._operationByGroup(groupName, {
      operation: 'delete',
      modification
    });
  },

  async _userReplaceOperation(userName, modification) {
    return this._operationByUser(userName, {
      operation: 'replace',
      modification
    });
  },

  async _userReplaceOperations(userName, modifications, opts) {
    const changes = modifications.map(modification => ({
      operation: 'replace',
      modification: modification
    }));
    return this._operationsByUser(userName, changes, opts);
  }
};
