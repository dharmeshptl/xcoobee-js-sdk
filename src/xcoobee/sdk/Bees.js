import ApiUtils from '../../xcoobee/api/ApiUtils';
import BeesApi from '../../xcoobee/api/BeesApi';
import DirectiveApi from '../../xcoobee/api/DirectiveApi';
import UploadPolicyIntents from '../../xcoobee/api/UploadPolicyIntents';

import XcooBeeError from '../core/XcooBeeError';

import ErrorResponse from './ErrorResponse';
import FileUtils from './FileUtils';
import SdkUtils from './SdkUtils';
import SuccessResponse from './SuccessResponse';

/**
 * The Bees service.
 */
class Bees {

  constructor(config, apiAccessTokenCache, usersCache) {
    this._ = {
      apiAccessTokenCache,
      config: config || null,
      usersCache,
    };
  }

  set config(config) {
    this._.config = config;
  }

  _assertValidState() {
    if (!this._.config) {
      throw TypeError('Illegal State: Default config has not been set yet.');
    }
  }

  /**
   * Returns a page of bees in the system that your account is able to hire that
   * match the specified search text.
   *
   * ```js
   * listBees('social')
   *   .then(res => {
   *     const { code, results, error, time } = res;
   *     if (code >= 300 || error) {
   *       if (error) {
   *         console.error(error);
   *       }
   *       return;
   *     }
   *     const bees = results;
   *     bees.forEach(bee => {
   *       const { bee_system_name, description, bee_icon, ...etc } = bee;
   *       // DO something with this data.
   *     });
   *   })
   * ```
   *
   * @async
   * @param {string} searchText - The search text.  It is a string of keywords to
   *  search for in the bee system name or label in the language of your account.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse|ErrorResponse, undefined>} - The response.
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {Bee[]} result.data - Bees for this page.
   * @property {Object} [result.page_info] - The page information.
   * @property {boolean} result.page_info.has_next_page - Flag indicating whether there is
   *   another page of data to may be fetched.
   * @property {string} result.page_info.end_cursor - The end cursor.
   *
   * @throws {XcooBeeError}
   */
  async listBees(searchText, config) {
    this._assertValidState();
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await BeesApi.bees(apiUrlRoot, apiAccessToken, searchText);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      return new ErrorResponse(400, err);
    }
  }

  /**
   *
   * @param {string[]} bees - A mapping of bee names to bee parameters.
   * @param {string} bees<key> - The bee name.  A 'transfer' bee will be ignored.
   * @param {Object} bees<value> - The bee parameters.
   * @param {Object} options - The bee take off options.
   * @param {Object} options.process -
   * @param {Array<email|XcooBeeId>} [options.process.destinations] -
   * @param {?} options.process.fileNames -
   * @param {Object} [options.process.userReference] -
   * @param {?} [subscriptions]
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<?>} TODO: Document structure.
   *
   * @throws XcooBeeError
   */
  async takeOff(bees, options, subscriptions, config) {
    this._assertValidState();
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    const directiveInput = {
      filenames: options.process.fileNames,
      user_reference: options.process.userReference || null,
    };

    if (subscriptions) {
      directiveInput.subscriptions = subscriptions;
    }

    if (
      Array.isArray(options.process.destinations) &&
      options.process.destinations.length > 0
    ) {
      directiveInput.destinations = options.process.destinations.map(
        destination => {
          if (ApiUtils.appearsToBeAnEmailAddress(destination)) {
            return { email: destination };
          }
          return { xcoobee_id: destination };
        }
      );
    }

    directiveInput.bees = [];
    for (let beeName in bees) {
      if (beeName !== 'transfer') {
        let beeParams = bees[beeName];
        directiveInput.bees.push({
          bee_name: beeName,
          params: JSON.stringify(beeParams),
        });
      }
    }

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const ref_id = await DirectiveApi.addDirective(apiUrlRoot, apiAccessToken, directiveInput);
      const response = new SuccessResponse({ ref_id });
      return response;
    } catch (err) {
      return new ErrorResponse(400, err);
    }
  }

  /**
   * Uploads specified files to XcooBee.
   *
   * @param {string[]|File[]} files - File paths of the files on the local file system
   *   to be uploaded.  For example, 'C:\Temp\MyPic.jpg' or '~/MyPic.jpg`.  Or an array
   *   of 'File' objects as is available in a modern browser.
   *   TODO: Test what file paths actually work and make sure the documentation is
   *   adequate.  Be sure to show examples of various path types.
   * @param {string} [intent] - One of the "outbox" endpoints defined in the
   *   XcooBee UI.  If an endpoint is not specified, then be sure to call the
   *   `takeOff` function afterwards.  TODO: Make sure this documentation is accurate.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} TODO: Document structure.
   *
   * @throws XcooBeeError
   */
  async uploadFiles(files, intent, config) {
    this._assertValidState();
    const endPointName = intent || UploadPolicyIntents.OUTBOX;
    if (endPointName !== UploadPolicyIntents.OUTBOX) {
      throw new XcooBeeError(
        `The "intent" argument must be one of: null, undefined, or "${UploadPolicyIntents.OUTBOX}".`
      );
    }
    let apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const user = await this._.usersCache.get(apiUrlRoot, apiKey, apiSecret);
      const userCursor = user.cursor;
      const results = await FileUtils.upload(apiUrlRoot, apiAccessToken, userCursor, endPointName, files);
      const response = new SuccessResponse(results);
      return response;
    } catch (err) {
      return new ErrorResponse(400, err);
    }
  }

}// eo class Bees

export default Bees;
