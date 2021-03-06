const ApiUtils = require('./ApiUtils');

/**
 *
 * @param {string} apiUrlRoot - The root of the API URL.
 * @param {ApiAccessToken} apiAccessToken - A valid API access token.
 * @param {DirectiveInput} directiveInput - The directive input.
 *
 * @returns {Promise<Object>} - The result.
 * @property {string} ref_id - A reference ID generated by the XcooBee system.
 */
const addDirective = (apiUrlRoot, apiAccessToken, directiveInput) => {
  const query = `
    mutation addDirective($directiveInput: DirectiveInput!) {
      add_directive(params: $directiveInput) {
        ref_id
      }
    }
  `;
  return ApiUtils.createClient(apiUrlRoot, apiAccessToken).request(query, {
    directiveInput,
  })
    .then((response) => {
      const { add_directive } = response;

      return add_directive.ref_id;
    })
    .catch((err) => {
      throw ApiUtils.transformError(err);
    });
};

module.exports = {
  addDirective,
};
