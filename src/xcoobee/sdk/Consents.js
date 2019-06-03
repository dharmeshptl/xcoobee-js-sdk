const CampaignApi = require('../../xcoobee/api/CampaignApi');
const ConsentsApi = require('../../xcoobee/api/ConsentsApi');
const UploadPolicyIntents = require('../../xcoobee/api/UploadPolicyIntents');

const XcooBeeError = require('../core/XcooBeeError');

const ErrorResponse = require('./ErrorResponse');
const FileUtils = require('./FileUtils');
const SdkUtils = require('./SdkUtils');
const SuccessResponse = require('./SuccessResponse');

/**
 * The Consents SDK service.
 *
 * Instances are not created directly. An {@link Sdk} instance will have a
 * reference to a `Consents` SDK instance through the {@link Sdk#consents consents}
 * property.
 *
 * ```js
 * const XcooBee = require('xcoobee-sdk');
 *
 * const sdk = new XcooBee.Sdk(...);
 * sdk.consents.getConsentData(...).then(...);
 * ```
 *
 * @param {Config} config
 * @param {ApiAccessTokenCache} apiAccessTokenCache
 * @param {UsersCache} usersCache
 */
class Consents {

  /* eslint-disable-next-line valid-jsdoc */
  /**
   * Constructs a Consents SDK service instance.
   */
  constructor(config, apiAccessTokenCache, usersCache) {
    this._ = {
      apiAccessTokenCache,
      config: config || null,
      usersCache,
    };
  }

  /**
   * @protected
   * @param {Config} config
   */
  set config(config) {
    this._.config = config;
  }

  /**
   * @protected
   */
  _assertValidState() {
    if (!this._.config) {
      throw TypeError('Illegal State: Default config has not been set yet.');
    }
  }

  /**
   * Determines whether data has been changed according to changes requested.
   *
   * @async
   * @param {ConsentId} consentId - The consent ID of the data being confirmed.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse | ErrorResponse>}
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {boolean} result.confirmed - Flag indicating whether the change is
   *   confirmed.
   *
   * @throws {XcooBeeError}
   */
  async confirmConsentChange(consentId, config = null) {
    this._assertValidState();
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await ConsentsApi.confirmConsentChange(apiUrlRoot, apiAccessToken, consentId);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * Opens consent related dispute.
   *
   * @async
   * @param {ConsentId} consentId - The consent ID.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse, ErrorResponse>}
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {boolean} result.confirmed - Flag indicating whether the change is
   *   confirmed.
   *
   * @throws {XcooBeeError}
   */
  async declineConsentChange(consentId, config = null) {
    this._assertValidState();
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await ConsentsApi.declineConsentChange(apiUrlRoot, apiAccessToken, consentId);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * Determines whether data has been deleted/purged from data holder.
   *
   * @async
   * @param {ConsentId} consentId - The consent ID of the data being confirmed.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse | ErrorResponse>}
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {boolean} result.confirmed - Flag indicating whether the consent data
   *   was deleted.
   *
   * @throws {XcooBeeError}
   */
  async confirmDataDelete(consentId, config = null) {
    this._assertValidState();
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await ConsentsApi.confirmDataDelete(apiUrlRoot, apiAccessToken, consentId);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * Fetches the campaign's basic information for the campaign with the specified
   * ID.
   *
   * @async
   * @param {CampaignId} [campaignId] - The ID of the campaign to fetch.  If not specified
   *   or is `undefined`, then the default campaign ID is used if set.  If a campaign
   *   ID cannot be resolved, then a `XcooBeeError` will be thrown.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse | ErrorResponse>} - The response.
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {CampaignStruct} result.campaign - The campaign information.
   *
   * @throws {XcooBeeError}
   */
  async getCampaignInfo(campaignId = null, config = null) {
    this._assertValidState();
    const resolvedCampaignId = SdkUtils.resolveCampaignId(campaignId, config, this._.config);
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await CampaignApi.getCampaignInfo(apiUrlRoot, apiAccessToken, resolvedCampaignId);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * Fetches the consent data with the specified ID.
   *
   * @async
   * @param {ConsentId} consentId - The ID of the consent to fetch.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse | ErrorResponse>} - The response.
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {ConsentStruct} result.consent - The consent data.
   *
   * @throws {XcooBeeError}
   */
  async getConsentData(consentId, config = null) {
    this._assertValidState();
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await ConsentsApi.getConsentData(apiUrlRoot, apiAccessToken, consentId);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * Fetches an existing user's cookie consent information.
   *
   * @async
   * @param {XcooBeeId} xcoobeeId - The XcooBee ID for which to fetch cookie consent
   *   information.
   * @param {CampaignId} [campaignId] - The ID of the campaign to use.  If not
   *   specified or is `undefined`, then the default campaign ID is used if set.  If a
   *   campaign ID cannot be resolved, then a `XcooBeeError` will be thrown.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse | ErrorResponse>} - The response.
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {Object<ConsentDataType, boolean>} result.cookie_consents - The cookie
   *   consent information.
   *
   * @throws {XcooBeeError}
   */
  async getCookieConsent(xcoobeeId, campaignId = null, config = null) {
    this._assertValidState();
    const resolvedCampaignId = SdkUtils.resolveCampaignId(campaignId, config, this._.config);
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const user = await this._.usersCache.get(apiUrlRoot, apiKey, apiSecret);
      const userCursor = user.cursor;
      const result = await ConsentsApi.getCookieConsent(apiUrlRoot, apiAccessToken, xcoobeeId, userCursor, resolvedCampaignId);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * Fetches a page of campaigns.
   *
   * @async
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
   * @property {Campaign[]} result.data - Campaigns for this page.
   * @property {Object} [result.page_info] - The page information.
   * @property {boolean} result.page_info.has_next_page - Flag indicating whether there is
   *   another page of data to may be fetched.
   * @property {string} result.page_info.end_cursor - The end cursor.
   *
   * @throws {XcooBeeError}
   */
  async listCampaigns(config = null) {
    this._assertValidState();

    const fetchPage = async (apiCfg, params) => {
      const { apiKey, apiSecret, apiUrlRoot } = apiCfg;
      const { after, limit } = params;
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const user = await this._.usersCache.get(apiUrlRoot, apiKey, apiSecret);
      const userCursor = user.cursor;
      const campaignsPage = await CampaignApi.getCampaigns(apiUrlRoot, apiAccessToken, userCursor, after, limit);
      return campaignsPage;
    };
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);

    return SdkUtils.startPaging(fetchPage, apiCfg, {});
  }

  /**
   * Fetches a page of consents with the given status.
   *
   * @async
   * @param {ConsentStatus[]} statuses
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
   * @property {Campaign[]} result.data - Consents for this page.
   * @property {Object} [result.page_info] - The page information.
   * @property {boolean} result.page_info.has_next_page - Flag indicating whether there is
   *   another page of data to may be fetched.
   * @property {string} result.page_info.end_cursor - The end cursor.
   *
   * @throws {XcooBeeError}
   */
  async listConsents(statuses, config = null) {
    this._assertValidState();

    const fetchPage = async (apiCfg, params) => {
      const { apiKey, apiSecret, apiUrlRoot } = apiCfg;
      const { after, limit, statuses: consentStatuses } = params;
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const user = await this._.usersCache.get(apiUrlRoot, apiKey, apiSecret);
      const userCursor = user.cursor;
      const consentsPage = await ConsentsApi.listConsents(apiUrlRoot, apiAccessToken, userCursor, consentStatuses, after, limit);
      return consentsPage;
    };
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);

    return SdkUtils.startPaging(fetchPage, apiCfg, { statuses: statuses || [] });
  }

  /**
   * Requests consent from the specified user.
   *
   * @async
   * @param {XcooBeeId} xid - The XcooBee ID from which consent is being
   *   requested.
   * @param {RequestRefId} requestRef - A request reference ID generated by you that
   *   identifies this request.  This ID will be returned in the `ConsentApproved`
   *   and `ConsentDeclined` consent events.  May be a maximum of 64 characters long.
   * @param {CampaignId} [campaignId] - The ID of the campaign for which consent is
   *   being requested.  If not specified or is `undefined`, then the default campaign
   *   ID is used if set.  If a campaign ID cannot be resolved, then a `XcooBeeError`
   *   will be thrown.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse | ErrorResponse>} - The response.
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {string} result.ref_id
   *
   * @throws {XcooBeeError}
   */
  async requestConsent(xid, requestRef = null, campaignId = null, config = null) {
    this._assertValidState();
    const resolvedCampaignId = SdkUtils.resolveCampaignId(campaignId, config, this._.config);
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await ConsentsApi.requestConsent(apiUrlRoot, apiAccessToken, xid, resolvedCampaignId, requestRef);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * Sends a response to a user-data request.  This call will send a message to the
   * user's communication center.
   *
   * Standard hiring points will be deducted for this.
   *
   * @async
   * @param {string} message - The message to be sent to the user.
   * @param {RequestRefId} requestRef - A request reference ID generated by you that
   *   identifies this request.  This ID will be returned in the `UserDataRequest`
   *   consent events.  May be a maximum of 64 characters long.
   * @param {string} filename - The user's data being requested.
   * @param {string} targetUrl - a webhook URL that will receive processing events
   * @param {string} eventHandler - name of a function that will process POST events sent to webhook URL
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse | ErrorResponse>}
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {string[]} result.progress - A set of progress messages. Each message
   *   will begin with the word `'failed'` or `'successfully'`.
   * @property {string} result.ref_id - A reference ID generated by the XcooBee
   *   system.
   *
   * @throws {XcooBeeError}
   */
  async setUserDataResponse(message, requestRef, filename, targetUrl, eventHandler, config = null) {
    this._assertValidState();
    const apiCfg = SdkUtils.resolveApiCfg(config, this._.config);
    const { apiKey, apiSecret, apiUrlRoot } = apiCfg;

    const errors = [];
    const progress = [];
    let response;
    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const user = await this._.usersCache.get(apiUrlRoot, apiKey, apiSecret);
      const userCursor = user.cursor;

      const result = { progress, ref_id: null };
      if (requestRef && filename) {
        const endPointName = UploadPolicyIntents.OUTBOX;
        const fileUploadResults = await FileUtils.upload(apiUrlRoot, apiAccessToken, userCursor, endPointName, [filename]);

        const successfullyUploadedFiles = [];
        fileUploadResults.forEach((fileUploadResult) => {
          const { error, file, success } = fileUploadResult;
          if (success) {
            successfullyUploadedFiles.push(file);
            progress.push(`successfully uploaded ${file}`);
          } else {
            errors.push(`Failed to upload file: ${file}. Error: ${error}.`);
            progress.push(`failed upload on ${file}`);
          }
        });

        if (successfullyUploadedFiles.length > 0) {
          const refId = await ConsentsApi.setUserDataResponse(apiUrlRoot, apiAccessToken, message, requestRef, filename, targetUrl, eventHandler);
          progress.push('successfully sent data response');
          result.ref_id = refId;
        }
      }
      response = new SuccessResponse(result);
    } catch (err) {
      errors.push(err.message);
    }

    if (errors.length > 0) {
      const err = errors.join(' ');
      throw new ErrorResponse(400, new XcooBeeError(err));
    }
    return response;
  }

  /**
   * Determines whether data has been changed according to changes requested.
   *
   * @async
   * @param {ConsentId} consentId - The consent ID of the data being confirmed.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<SuccessResponse | ErrorResponse>}
   * @property {number} code - The response status code.
   * @property {Error} [error] - The response error if status is not successful.
   * @property {string} [error.message] - The error message.
   * @property {string} request_id - The ID of the request generated by the XcooBee
   *   system.
   * @property {Object} [result] - The result of the response if status is successful.
   * @property {boolean} result.confirmed - Flag indicating whether the change is
   *   confirmed.
   *
   * @throws {XcooBeeError}
   */
  async getDataPackage(consentId, config = null) {
    this._assertValidState();
    const sdkCfg = SdkUtils.resolveSdkCfg(config, this._.config);
    const {
      apiKey,
      apiSecret,
      apiUrlRoot,
      pgpPassword,
      pgpSecret,
    } = sdkCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await ConsentsApi.getDataPackage(apiUrlRoot, apiAccessToken, consentId, pgpSecret, pgpPassword);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

  /**
   * "Register consents received outside of XcooBee"
   *
   * @param {string} campaignCursor
   * @param {Array<RegisterConsentTarget>} targets
   * @param {string} [filename]
   * @param {string} [reference]
   * @param {Config} [config]
   * @returns {Promise<SuccessResponse>}
   */
  async registerConsents(campaignCursor, targets, filename, reference, config = null) {
    this._assertValidState();
    const sdkCfg = SdkUtils.resolveSdkCfg(config, this._.config);
    const {
      apiKey,
      apiSecret,
      apiUrlRoot,
    } = sdkCfg;

    try {
      const apiAccessToken = await this._.apiAccessTokenCache.get(apiUrlRoot, apiKey, apiSecret);
      const result = await ConsentsApi.registerConsents(apiUrlRoot, apiAccessToken, campaignCursor, targets, filename, reference);
      const response = new SuccessResponse(result);
      return response;
    } catch (err) {
      throw new ErrorResponse(400, err);
    }
  }

}// eo class Consents

module.exports = Consents;
