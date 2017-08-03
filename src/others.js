/**
 *  Public functions on misc ad actions
 *  --------------------------
 *  getAllOthers(opts)
 *  getAll(opts)
 */

module.exports = {
  async getAllOthers(opts) {
    return await this._findByType(opts, ['other']);
  },

  async getAll(opts) {
    return await this._findByType(opts, ['all']);
  }
};
