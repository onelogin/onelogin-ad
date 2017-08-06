/**
 *  Exposes library through simple,
 *  chainable functions
 *  --------------------------
 *  ad.user().get(opts);
 *  ad.user().add({!userName, !commonName, !pass});
 *  ad.user(username).get(opts);
 *  ad.user(userName).exists();
 *  ad.user(userName).addToGroup(groupName);
 *  ad.user(userName).removeFromGroup(groupName);
 *  ad.user(userName).isMemberOf(groupName);
 *  ad.user(userName).authenticate(password);
 *  ad.user(userName).password(password);
 *  ad.user(userName).passwordNeverExpires();
 *  ad.user(userName).passwordExpires();
 *  ad.user(userName).enable();
 *  ad.user(userName).disable();
 *  ad.user(userName).move(location);
 *  ad.user(userName).unlock();
 *  ad.user(userName).remove();
 *  ad.user(userName).location();
 *  
 *  ad.group().get(opts);
 *  ad.group().add();
 *  ad.group(groupName).get(opts);
 *  ad.group(groupName).exists();
 *  ad.group(groupName).addUser(userName);
 *  ad.group(groupName).removeUser(userName);
 *  ad.group(groupName).remove();
 *  
 *  ad.ou().get(opts);
 *  ad.ou().add(opts);
 *  ad.ou(ouName).get();
 *  ad.ou(ouName).exists();
 *  ad.ou(ouName).remove();
 *  
 *  ad.other().get(opts);
 *  ad.all().get(opts);
 *  ad.find(searchString);
 */

module.exports = {
  user(userName) {
    if (userName === undefined) {
      return {
        get: filter => {
          return this.getAllUsers(filter);
        },
        add: opts => {
          return this.addUser(opts);
        }
      };
    }

    return {
      get: opts => {
        return this.findUser(userName, opts);
      },
      update: opts => {
        return this.updateUser(userName, opts);
      },
      exists: () => {
        return this.userExists(userName);
      },
      addToGroup: groupName => {
        return this.addUserToGroup(userName, groupName);
      },
      removeFromGroup: groupName => {
        return this.removeUserFromGroup(userName, groupName);
      },
      isMemberOf: groupName => {
        return this.userIsMemberOf(userName, groupName);
      },
      authenticate: pass => {
        return this.authenticateUser(userName, pass);
      },
      password: pass => {
        return this.setUserPassword(userName, pass);
      },
      passwordNeverExpires: () => {
        return this.setUserPasswordNeverExpires(userName);
      },
      passwordExpires: () => {
        return this.enableUser(userName);
      },
      enable: () => {
        return this.enableUser(userName);
      },
      disable: () => {
        return this.disableUser(userName);
      },
      move: location => {
        return this.moveUser(userName, location);
      },
      location: () => {
        return this.getUserLocation(userName);
      },
      unlock: () => {
        return this.unlockUser(userName);
      },
      remove: () => {
        return this.removeUser(userName);
      }
    };
  },

  group(groupName) {
    if (groupName === undefined) {
      return {
        get: opts => {
          return this.getAllGroups(opts);
        },
        add: opts => {
          return this.addGroup(opts);
        }
      };
    }

    return {
      get: opts => {
        return this.findGroup(groupName, opts);
      },
      exists: () => {
        return this.groupExists(groupName);
      },
      addUser: userName => {
        return this.addUserToGroup(userName, groupName);
      },
      removeUser: userName => {
        return this.removeUserFromGroup(userName, groupName);
      },
      remove: () => {
        return this.removeGroup(groupName);
      }
    };
  },

  ou(ouName) {
    if (ouName === undefined) {
      return {
        get: filter => {
          return this.getAllOUs(filter);
        },
        add: opts => {
          return this.addOU(opts);
        }
      };
    }

    return {
      get: () => {
        return this.findOU(ouName);
      },
      exists: () => {
        return this.ouExists(ouName);
      },
      remove: () => {
        return this.removeOU(ouName);
      }
    };
  },

  other() {
    return {
      get: opts => {
        return this.getAllOthers(opts);
      }
    };
  },

  all() {
    return {
      get: opts => {
        return this.getAll(opts);
      }
    };
  },

  find(searchString, opts) {
    return this._search(searchString, opts);
  }
};
