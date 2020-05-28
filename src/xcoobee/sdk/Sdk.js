const ApiAccessTokenCache = require('../api/ApiAccessTokenCache');
const UsersCache = require('../api/UsersCache');

const Bees = require('./Bees');
const Consents = require('./Consents');
const Inbox = require('./Inbox');
const System = require('./System');
const Users = require('./Users');

const apiAccessTokenCache = new ApiAccessTokenCache();
const usersCache = new UsersCache(apiAccessTokenCache);

/**
 * The SDK class.
 *
 * ```js
 * const XcooBee = require('xcoobee-sdk');
 *
 * const config = new XcooBee.Config({
 *   apiKey: '...',
 *   apiSecret: '...',
 *   apiUrlRoot: '...',
 *   campaignId: null,
 *   encrypt: false,
 *   pgpPassword: null,
 *   pgpSecret: null,
 * });
 * const sdk = new XcooBee.Sdk(config);
 * ```
 *
 * ```js
 * const { Config, Sdk } = require('xcoobee-sdk');
 *
 * const config = new Config({
 *   apiKey: '...',
 *   apiSecret: '...',
 *   apiUrlRoot: '...',
 *   campaignId: null,
 *   encrypt: false,
 *   pgpPassword: null,
 *   pgpSecret: null,
 * });
 * const sdk = new Sdk(config);
 * ```
 *
 * @param {Config?} config The default configuration to use when a configuration
 *   is not specified with individual SDK calls.
 */
class Sdk {

  /* eslint-disable-next-line valid-jsdoc */
  /**
   * Constructs an Sdk instance.
   */
  constructor(config) {
    if (config) {
      this.config = config;
    }
  }

  /**
   * Returns a reference to a bees SDK instance.
   *
   * @readonly
   * @returns {Bees}
   */
  get bees() {
    return this._.bees;
  }

  /**
   * Returns a reference to the current configuration.
   *
   * @returns {Config}
   */
  get config() {
    return this._.config;
  }

  /**
   * Sets the current configuration to the given configuration.
   *
   * @param {Config} config
   */
  set config(config) {
    // TODO: Validate config.
    this._.bees.config = config;
    this._.consents.config = config;
    this._.inbox.config = config;
    this._.system.config = config;
    this._.users.config = config;
    this._.config = config;
  }

  /**
   * Returns a reference to a consents SDK instance.
   *
   * @readonly
   * @returns {Consents}
   */
  get consents() {
    return this._.consents;
  }

  /**
   * Returns a reference to a inbox SDK instance.
   *
   * @readonly
   * @returns {Inbox}
   */
  get inbox() {
    return this._.inbox;
  }

  /**
   * Returns a reference to a system SDK instance.
   *
   * @readonly
   * @returns {System}
   */
  get system() {
    return this._.system;
  }

  /**
   * Returns a reference to an users SDK instance.
   *
   * @readonly
   * @returns {Users}
   */
  get users() {
    return this._.users;
  }

}// eo class Sdk

Sdk.prototype._ = {
  config: null,
  bees: new Bees(null, apiAccessTokenCache, usersCache),
  consents: new Consents(null, apiAccessTokenCache, usersCache),
  inbox: new Inbox(null, apiAccessTokenCache, usersCache),
  system: new System(null, apiAccessTokenCache, usersCache),
  users: new Users(null, apiAccessTokenCache, usersCache),
};

module.exports = Sdk;
