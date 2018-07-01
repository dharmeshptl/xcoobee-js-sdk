/**
 * The Consents service.
 */
class Consents {

  constructor(config) {
    this._ = {
      config: config || null,
    };
  }

  set config(config) {
    this._.config = config;
  }

  // TODO: Document CampaignId
  // TODO: Document CampaignStruct
  // * @returns {string} return.response.data.campaign_name
  // * @returns {?} return.response.data.date_c
  // * @returns {?} return.response.data.date_e
  // * @returns {?} return.response.data.status
  // * @returns {?} return.response.data.xcoobee_targets
  // * @returns {?} return.response.data.xcoobee_targets.xcoobee_id

  // TODO: Document CreateCampaignStruct
  // TODO: Document ConsentId
  // TODO: Document RequestRefId

  /**
   * Activates the campaign with the specified ID.
   *
   * @param {CampaignId} [campaignId] - The ID of the campaign to activate.  If not
   *   specified or is `undefined`, then the default campaign ID is used if set.  If a
   *   campaign ID cannot be resolved, then a `XcooBeeError` will be thrown.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a `CampaignId` as the data.
   * @returns {Response} return.response
   * @returns {CampaignId} return.response.data
   *
   * @throws XcooBeeError
   */
  activateCampaign(campaignId, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Creates a new campaign.
   *
   * @param {CreateCampaignStruct} data - The data of the campaign to be created.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a `CampaignId` as the data.
   * @returns {Response} return.response
   * @returns {CampaignId} return.response.data
   *
   * @throws XcooBeeError
   */
  createCampaign(data, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Determines whether data has been changed according to changes requested.
   *
   * @param {ConsentId} consentId - The consent ID of the data being confirmed.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a boolean as the data property indicating
   *   whether the data has been changed.
   * @returns {Response} return.response
   * @returns {boolean} return.response.data
   *
   * @throws XcooBeeError
   */
  confirmConsentChange(consentId, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Determines whether data has been deleted/purged from data holder.
   *
   * @param {ConsentId} consentId - The consent ID of the data being confirmed.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a boolean as the data property indicating
   *   whether the data has been deleted/purged.
   * @returns {Response} return.response
   * @returns {boolean} return.response.data
   *
   * @throws XcooBeeError
   */
  confirmDataDelete(consentId, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Fetches the campaign's basic information for the campaign with the specified
   * ID.
   *
   * @param {CampaignId} [campaignId] - The ID of the campaign to fetch.  If not specified
   *   or is `undefined`, then the default campaign ID is used if set.  If a campaign
   *   ID cannot be resolved, then a `XcooBeeError` will be thrown.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a `CampaignStruct` as the data.
   * @returns {Response} return.response
   * @returns {CampaignStruct} return.response.data
   *
   * @throws XcooBeeError
   */
  getCampaignInfo(campaignId, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Fetches the consent data with the specified ID.
   *
   * @param {ConsentId} consentId - The ID of the consent to fetch.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a `ConsentStruct` as the data.
   * @returns {Response} return.response
   * @returns {ConsentStruct} return.response.data
   *
   * @throws XcooBeeError
   */
  getConsentData(consentId, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Fetches an existing user's cookie consent information.
   *
   * @param {XcooBeeId} xcooBeeId - The XcooBee ID for which to fetch cookie consent
   *   information.
   * @param {CampaignId} [campaignId] - The ID of the campaign to use.  If not
   *   specified or is `undefined`, then the default campaign ID is used if set.  If a
   *   campaign ID cannot be resolved, then a `XcooBeeError` will be thrown.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a website cookie consent CSV as the data.  The
   *   CSV has the following columns: application, usage, and advertising.  The  first
   *   line in the CSV will be the header containing these columns.
   * @returns {Response} return.response
   * @returns {string} return.response.data
   *
   * @throws XcooBeeError
   */
  getCookieConsent(xcooBeeId, campaignId, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Fetches the list of all campaigns.
   *
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have an array of `CampaignStruct`s as the data.
   * @returns {Response} return.response
   * @returns {CampaignStruct[]} return.response.data
   *
   * @throws XcooBeeError
   */
  listCampaigns(config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Modifies the campaign with the specified ID.
   *
   * @param {CampaignId} [campaignId] - The ID of the campaign to modify.  If not
   *   specified or is `undefined`, then the default campaign ID is used if set.  If a
   *   campaign ID cannot be resolved, then a `XcooBeeError` will be thrown.
   * @param {Object} data - The campaign data to be modified.  TODO: Document the structure.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a `CampaignId` as the data.
   * @returns {Response} return.response
   * @returns {CampaignId} return.response.data
   *
   * @throws XcooBeeError
   */
  modifyCampaign(campaignId, data, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Requests consent from the specified user.
   *
   * @param {XcooBeeId} xcooBeeId - The XcooBee ID from which consent is being
   *   requested.
   * @param {RequestRefId} reqRefId - A request reference ID generated by you that
   *   identifies this request.  This ID will be returned in the `ConsentApproved`
   *   and `ConsentDeclined` consent events.  May be a maximum of 64 characters long.
   * @param {CampaignId} [campaignId] - The ID of the campaign for which consent is
   *   being requested.  If not specified or is `undefined`, then the default campaign
   *   ID is used if set.  If a campaign ID cannot be resolved, then a `XcooBeeError`
   *   will be thrown.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a boolean as the data property indicating
   *   whether the request was successful.  Note: It does **NOT** indicate whether
   *   the consent was approved or declined.
   * @returns {Response} return.response
   * @returns {boolean} return.response.data
   *
   * @throws XcooBeeError
   */
  requestConsent(xcooBeeId, reqRefId, campaignId, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

  /**
   * Sends a response to a user-data request.  This call will send a message to the
   * user's communication center.
   *
   * Standard hiring points will be deducted for this.
   *
   * @param {string} message - The message to be sent to the user.
   * @param {ConsentId} consentId - The ID of the consent to which you are responding.
   * @param {RequestRefId} reqRefId - A request reference ID generated by you that
   *   identifies this request.  This ID will be returned in the `UserDataRequest`
   *   consent events.  May be a maximum of 64 characters long.
   * @param {string} filename - The user's data being requested.
   * @param {Config} [config] - If specified, the configuration to use instead of the
   *   default.
   *
   * @returns {Promise<Response>} A promise that resolves to a `Response` instance.
   *   A successful response will have a boolean as the data property indicating
   *   whether the message was successfully sent.
   * @returns {Response} return.response
   * @returns {boolean} return.response.data
   *
   * @throws XcooBeeError
   */
  setUserDataResponse(message, consentId, requestRef, filename, config) {
    // TODO: To be implemented.
    throw Error('NotYetImplemented');
  }

}// eo class Consents

export default Consents;