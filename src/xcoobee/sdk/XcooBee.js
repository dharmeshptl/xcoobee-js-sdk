import Bees from './Bees';
import Consents from './Consents';
import System from './System';
import Users from './Users';

/**
 * The SDK entry point.
 *
 * ```js
 * const config = {
 *   apiKey: '...',
 *   apiSecret: '...',
 *   campaignId: null,
 *   encrypt: true,
 *   pgpPassword: null,
 *   pgpSecret: null,
 * };
 * const xcooBee = new XcooBee(config);
 * ```
 */
class XcooBee {

  /**
   *
   * @param {Object} [config] The default configuration to use when a configuration
   *   is not specified with individual SDK calls.
   */
  constructor(config) {
    let cfg = config || null;
    this._ = {
      bees: new Bees(cfg),
      config: cfg,
      consents: new Consents(cfg),
      system: new System(cfg),
      users: new Users(cfg),
    }
  }

  get bees() {
    return this._.bees;
  }

  get config() {
    return this._.config;
  }

  set config(config) {
    // TODO: Validate config.
    this._.bees.config = config;
    this._.consents.config = config;
    this._.system.config = config;
    this._.users.config = config;
    this._.config = config;
  }

  get consents() {
    return this._.consents;
  }

  get system() {
    return this._.system;
  }

  get users() {
    return this._.users;
  }

}// eo class XcooBee

export default XcooBee;