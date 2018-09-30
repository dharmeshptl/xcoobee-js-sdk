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
   * let socialBees = [];
   *
   * function collectSocialBees(pagingResponse) {
   *   const { result } = pagingResponse;
   *   const pageOfBees = result.data;
   *   socialBees = socialBees.concat(pageOfBees);
   *   if (pagingResponse.hasNextPage()) {
   *     pagingResponse.getNextPage().then(collectSocialBees);
   *   } else {
   *     socialBees.forEach(bee => {
   *       const { bee_system_name, description, bee_icon, ...etc } = bee;
   *       // DO something with this data.
   *     });
   *   }
   * }
   *
   * listBees('social')
   *   .then(collectSocialBees)
   *   .catch(res => {
   *     const { error } = res;
   *     console.error(error);
   *   });
   * ```
   *
   * @async
   * @param {string} searchText - The search text.  It is a string of keywords to
   *  search for in the bee system name or label in the language of your account.
   * @param {string} [after] - Fetch data after this cursor.
   * @param {number} [limit] - The maximum count to fetch.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<PagingResponse, ErrorResponse>} - The response.
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
  async listBees(searchText, after = null, limit = null, config = null) {
    this._assertValidState();

    const fetchPage = async (apiCfg, params) => {
      const { apiKey, apiSecret, apiUrlRoot } = apiCfg;
      const { after, limit, searchText } = params;
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const beesPage = await BeesApi.bees(apiUrlRoot, apiAccessToken, searchText, after, limit);
      return beesPage;
    };
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const params = { after, limit, searchText };

    return SdkUtils.startPaging(fetchPage, apiCfg, params);
  }

  /**
   *
   * @async
   * @param {string[]} bees - A mapping of bee names to bee parameters.
   * @param {string} bees<key> - The bee name.  A 'transfer' bee will be ignored.
   * @param {Object} bees<value> - The bee parameters.
   * @param {Object} options - The bee take off options.
   * @param {Object} options.process -
   * @param {Array<email|XcooBeeId>} [options.process.destinations] -
   * @param {string[]} options.process.fileNames -
   * @param {string} [options.process.userReference] -
   * @param {TransactionSubscriptions} [subscriptions]
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse, ErrorResponse>} - The response.
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {string} [result.ref_id] - A reference ID generated by the XcooBee
   *   system.
   *
   * @throws {XcooBeeError}
   */
  async takeOff(bees, options, subscriptions, config = null) {
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
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * Uploads specified files to XcooBee.
   *
   * @async
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
   * @returns {Promise<SuccessResponse, ErrorResponse>}
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object[]} [result] - The result of the response if status is
   *   successful. Is an array of sub-results. One for each file uploaded. Each
   *   sub-result has a string `file` property and a boolean `success` property
   *   indicating whether the file was successfully uploaded. If `success` is `false`,
   *   then an error `error` property will also exist.
   *
   * @throws {XcooBeeError}
   */
  async uploadFiles(files, intent, config = null) {
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
      const result = await FileUtils.upload(apiUrlRoot, apiAccessToken, userCursor, endPointName, files);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

}// eo class Bees

export default Bees;
