import ApiUtils, { createClient } from './ApiUtils';

/**
 *
 * @param {ApiAccessToken} apiAccessToken - A valid API access token.
 * @param {CampaignId} campaignId - The campaign ID.
 *
 * @returns {CampaignInfo}
 */
export function getCampaignInfo(apiAccessToken, campaignId) {
  ApiUtils.assertAppearsToBeACampaignId(campaignId);
  const query = `
    query getCampaignInfo($campaignId: String!) {
      campaign(campaign_cursor: $campaignId) {
        campaign_name
        date_c
        date_e
        status
        xcoobee_targets {
          xcoobee_id
        }
      }
    }
  `;
  return createClient(apiAccessToken).request(query, {
    campaignId,
  })
    .then((response) => {
      const { campaign } = response;
      // TODO: Transform data if necessary.
      return Promise.resolve(campaign);
    }, (err) => {
      throw ApiUtils.transformError(err);
    });
}

export default {
  getCampaignInfo,
};
