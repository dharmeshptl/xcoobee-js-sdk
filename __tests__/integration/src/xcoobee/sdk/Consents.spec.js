import Path from 'path';

import ApiAccessTokenCache from '../../../../../src/xcoobee/api/ApiAccessTokenCache';
import ConsentDataTypes from '../../../../../src/xcoobee/api/ConsentDataTypes';
import ConsentStatuses from '../../../../../src/xcoobee/api/ConsentStatuses';
import UsersCache from '../../../../../src/xcoobee/api/UsersCache';

import Config from '../../../../../src/xcoobee/sdk/Config';
import Consents from '../../../../../src/xcoobee/sdk/Consents';
import ErrorResponse from '../../../../../src/xcoobee/sdk/ErrorResponse';
import PagingResponse from '../../../../../src/xcoobee/sdk/PagingResponse';
import SuccessResponse from '../../../../../src/xcoobee/sdk/SuccessResponse';

import { assertIsCursorLike, assertIso8601Like } from '../../../../lib/Utils';

const apiUrlRoot = process.env.XCOOBEE__API_URL_ROOT || 'https://testapi.xcoobee.net/Test';
const apiKey = process.env.XCOOBEE__API_KEY;
const apiSecret = process.env.XCOOBEE__API_SECRET;

jest.setTimeout(60000);

describe('Consents', function () {

  const apiAccessTokenCache = new ApiAccessTokenCache();
  const usersCache = new UsersCache(apiAccessTokenCache);

  describe('instance', function () {

    describe('.confirmConsentChange', function () {

      describe('called with a valid API key/secret pair', function () {

        xdescribe('and a known consent ID', function () {

          describe('using default config', function () {

            it('should return flag indicating if the consent change has been confirmed', async function (done) {
              const defaultConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const consentId = 'known'; // FIXME: TODO: Get a legit consent ID.
              const response = await consentsSdk.confirmConsentChange(consentId);
              expect(response).toBeInstanceOf(SuccessResponse);
              const { result } = response;
              expect(result).toBeDefined();
              expect(typeof result.confirmed).toBe('boolean');

              done();
            });// eo it

          });// eo describe

          describe('using overriding config', function () {

            it('should return flag indicating if the consent change has been confirmed', async function (done) {
              const defaultConfig = new Config({
                apiKey: 'should_be_unused',
                apiSecret: 'should_be_unused',
                apiUrlRoot: 'should_be_unused',
              });
              const overridingConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const consentId = 'known'; // FIXME: TODO: Get a legit consent ID.
              const response = await consentsSdk.confirmConsentChange(consentId, overridingConfig);
              expect(response).toBeInstanceOf(SuccessResponse);
              const { result } = response;
              expect(result).toBeDefined();
              expect(typeof result.confirmed).toBe('boolean');

              done();
            });// eo it

          });// eo describe

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const consentId = 'does not matter';
          const response = await consentsSdk.confirmConsentChange(consentId);
          expect(response).toBeDefined();
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');
          done();
        });// eo it

      });// eo describe

    });// eo describe('.confirmConsentChange')

    describe('.confirmDataDelete', function () {

      describe('called with a valid API key/secret pair', function () {

        xdescribe('and a known consent ID', function () {

          describe('using default config', function () {

            it('should return flag indicating if the data has been deleted/purged', async function (done) {
              const defaultConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const consentId = 'known'; // FIXME: TODO: Get a legit consent ID.
              const response = await consentsSdk.confirmDataDelete(consentId);
              expect(response).toBeInstanceOf(SuccessResponse);
              const { result } = response;
              expect(result).toBeDefined();
              expect(typeof result.confirmed).toBe('boolean');

              done();
            });// eo it

          });// eo describe

          describe('using overriding config', function () {

            it('should return flag indicating if the data has been deleted/purged', async function (done) {
              const defaultConfig = new Config({
                apiKey: 'should_be_unused',
                apiSecret: 'should_be_unused',
                apiUrlRoot: 'should_be_unused',
              });
              const overridingConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const consentId = 'known'; // FIXME: TODO: Get a legit consent ID.
              const response = await consentsSdk.confirmDataDelete(consentId, overridingConfig);
              expect(response).toBeInstanceOf(SuccessResponse);
              const { result } = response;
              expect(result).toBeDefined();
              expect(typeof result.confirmed).toBe('boolean');

              done();
            });// eo it

          });// eo describe

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const consentId = 'does not matter';
          const response = await consentsSdk.confirmDataDelete(consentId);
          expect(response).toBeDefined();
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');
          done();
        });// eo it

      });// eo describe

    });// eo describe('.confirmDataDelete')

    describe('.getCampaignInfo', function () {

      describe('called with a valid API key/secret pair', function () {

        describe('and a known campaign ID', function () {

          describe('using default config', function () {

            it('should fetch and return with expected campaign info', async function (done) {
              const defaultConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const campaignId = 'CTZamTgKRBUqJsavV4+R8NnwaIv/mcLqI+enjUFlcARTKRidhcY4K0rbAb4KJDIL1uaaAA==';
              const response = await consentsSdk.getCampaignInfo(campaignId);
              expect(response).toBeInstanceOf(SuccessResponse);
              const { result } = response;
              expect(result).toBeDefined();
              expect(result.campaign).toBeDefined();
              const { campaign } = result;
              expect(campaign.campaign_description.text).toBe(undefined);
              expect(campaign.campaign_name).toBe('xcoobee test campaign');
              expect(campaign.campaign_title.text).toBe(undefined);
              expect(campaign.date_c).toBeDefined();
              expect(campaign.date_e).toBeDefined();
              expect(campaign.email_targets).toBeInstanceOf(Array);
              expect(campaign.email_targets.length).toBe(0);
              expect(campaign.endpoint).toBe(null);
              expect(campaign.status).toBe('active');
              expect(campaign.targets).toBeInstanceOf(Array);
              expect(campaign.targets.length).toBe(0);
              expect(campaign.xcoobee_targets).toBeInstanceOf(Array);
              expect(campaign.xcoobee_targets.length).toBe(0);

              done();
            });// eo it

          });// eo describe

          describe('using overriding config', function () {

            it('should fetch and return with expected campaign info', async function (done) {
              const defaultConfig = new Config({
                apiKey: 'should_be_unused',
                apiSecret: 'should_be_unused',
                apiUrlRoot: 'should_be_unused',
              });
              const overridingConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const campaignId = 'CTZamTgKRBUqJsavV4+R8NnwaIv/mcLqI+enjUFlcARTKRidhcY4K0rbAb4KJDIL1uaaAA==';
              const response = await consentsSdk.getCampaignInfo(campaignId, overridingConfig);
              expect(response).toBeInstanceOf(SuccessResponse);
              const { result } = response;
              expect(result).toBeDefined();
              expect(result.campaign).toBeDefined();
              const { campaign } = result;
              expect(campaign.campaign_description.text).toBe(undefined);
              expect(campaign.campaign_name).toBe('xcoobee test campaign');
              expect(campaign.campaign_title.text).toBe(undefined);
              expect(campaign.date_c).toBeDefined();
              expect(campaign.date_e).toBeDefined();
              expect(campaign.email_targets).toBeInstanceOf(Array);
              expect(campaign.email_targets.length).toBe(0);
              expect(campaign.endpoint).toBe(null);
              expect(campaign.status).toBe('active');
              expect(campaign.targets).toBeInstanceOf(Array);
              expect(campaign.targets.length).toBe(0);
              expect(campaign.xcoobee_targets).toBeInstanceOf(Array);
              expect(campaign.xcoobee_targets.length).toBe(0);

              done();
            });// eo it

          });// eo describe

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const campaignId = 'does not matter';
          const response = await consentsSdk.getCampaignInfo(campaignId);
          expect(response).toBeDefined();
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');
          done();
        });// eo it

      });// eo describe

    });// eo describe('.getCampaignInfo')

    describe('.getConsentData', function () {

      describe('called with a valid API key/secret pair', function () {

        xdescribe('and a known consent ID', function () {

          describe('using default config', function () {

            it('should fetch and return with consent info', async function (done) {
              const defaultConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const consentId = 'known'; // FIXME: TODO: Get a legit consent ID.
              const response = await consentsSdk.getConsentData(consentId);
              expect(response).toBeDefined();
              expect(response).toBeInstanceOf(SuccessResponse);
              const { result } = response;
              expect(result).toBeDefined();
              expect(result.consent).toBeDefined();
              // TODO: Add more expectations.
              done();
            });// eo it

          });// eo describe

          describe('using overriding config', function () {

            it('should fetch and return with consent info', async function (done) {
              const defaultConfig = new Config({
                apiKey: 'should_be_unused',
                apiSecret: 'should_be_unused',
                apiUrlRoot: 'should_be_unused',
              });
              const overridingConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const consentId = 'known'; // FIXME: TODO: Get a legit consent ID.
              const response = await consentsSdk.getConsentData(consentId, overridingConfig);
              expect(response).toBeDefined();
              expect(response).toBeInstanceOf(SuccessResponse);
              const { result } = response;
              expect(result).toBeDefined();
              expect(result.consent).toBeDefined();
              // TODO: Add more expectations.
              done();
            });// eo it

          });// eo describe

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const consentId = 'does not matter';
          const response = await consentsSdk.getConsentData(consentId);
          expect(response).toBeDefined();
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');
          done();
        });// eo it

      });// eo describe

    });// eo describe('.getConsentData')

    describe('.getCookieConsent', function () {

      describe('called with a valid API key/secret pair', function () {

        describe('using default config', function () {

          it('should fetch and return with cookie consent info', async function (done) {
            const defaultConfig = new Config({
              apiKey,
              apiSecret,
              apiUrlRoot,
            });

            const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
            const xcoobeeId = '~SDKTester_Developer';
            const campaignId = 'CTZamTgKRBUqJsavV4+R8NnwaIv/mcLqI+enjUFlcARTKRidhcY4K0rbAb4KJDIL1uaaAA==';
            const response = await consentsSdk.getCookieConsent(xcoobeeId, campaignId);
            expect(response).toBeInstanceOf(SuccessResponse);
            const { result } = response;
            expect(result).toBeDefined();
            expect(result.cookie_consents).toBeDefined();
            const { cookie_consents } = result;
            expect(typeof cookie_consents[ConsentDataTypes.ADVERTISING_COOKIE]).toBe('boolean');
            expect(typeof cookie_consents[ConsentDataTypes.APPLICATION_COOKIE]).toBe('boolean');
            expect(typeof cookie_consents[ConsentDataTypes.STATISTICS_COOKIE]).toBe('boolean');
            expect(typeof cookie_consents[ConsentDataTypes.USAGE_COOKIE]).toBe('boolean');

            done();
          });// eo it

        });// eo describe

        describe('using overriding config', function () {

          it('should fetch and return with cookie consent info', async function (done) {
            const defaultConfig = new Config({
              apiKey: 'should_be_unused',
              apiSecret: 'should_be_unused',
              apiUrlRoot: 'should_be_unused',
            });
            const overridingConfig = new Config({
              apiKey,
              apiSecret,
              apiUrlRoot,
            });

            const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
            const xcoobeeId = '~SDKTester_Developer';
            const campaignId = 'CTZamTgKRBUqJsavV4+R8NnwaIv/mcLqI+enjUFlcARTKRidhcY4K0rbAb4KJDIL1uaaAA==';
            const response = await consentsSdk.getCookieConsent(xcoobeeId, campaignId, overridingConfig);
            expect(response).toBeInstanceOf(SuccessResponse);
            const { result } = response;
            expect(result).toBeDefined();
            expect(result.cookie_consents).toBeDefined();
            const { cookie_consents } = result;
            expect(typeof cookie_consents[ConsentDataTypes.ADVERTISING_COOKIE]).toBe('boolean');
            expect(typeof cookie_consents[ConsentDataTypes.APPLICATION_COOKIE]).toBe('boolean');
            expect(typeof cookie_consents[ConsentDataTypes.STATISTICS_COOKIE]).toBe('boolean');
            expect(typeof cookie_consents[ConsentDataTypes.USAGE_COOKIE]).toBe('boolean');

            done();
          });// eo it

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const xcoobeeId = 'does not matter';
          const campaignId = 'does not matter';
          const response = await consentsSdk.getCookieConsent(xcoobeeId, campaignId);
          expect(response).toBeDefined();
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');
          done();
        });// eo it

      });// eo describe

    });// eo describe('.getCookieConsent')

    describe('.listCampaigns', function () {

      describe('called with a valid API key/secret pair', function () {

        describe('using default config', function () {

          it('should fetch and return with the user\'s events', async function (done) {
            const defaultConfig = new Config({
              apiKey,
              apiSecret,
              apiUrlRoot,
            });

            const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
            const response = await consentsSdk.listCampaigns();
            expect(response).toBeInstanceOf(PagingResponse);
            expect(response.hasNextPage()).toBe(false);
            const nextPageResponse = await response.getNextPage();
            expect(nextPageResponse).toBe(null);
            const { result } = response;
            expect(result).toBeDefined();
            expect(result.page_info).toBeDefined();
            expect(result.page_info.end_cursor).toBe('KGyAdqa9//owg9NvMGdRlTNrkAet748qYDRsNXlFtGtmWL/kfZ0+ep2MoZ1UKSpSOigHASNIf3iMOlb+bp1RGE9Xct534ynXaUqDDK9Mc8w=');
            expect(result.page_info.has_next_page).toBeNull();
            const campaigns = result.data;
            expect(campaigns).toBeInstanceOf(Array);
            expect(campaigns.length).toBe(1);
            const campaign = campaigns[0];
            expect(campaign).toBeDefined();
            expect(campaign.campaign_cursor).toBe('CTZamTgKRBUqJsavV4+R8NnwaIv/mcLqI+enjUFlcARTKRidhcY4K0rbAb4KJDIL1uaaAA==');
            expect(campaign.campaign_name).toBe('xcoobee test campaign');
            expect(campaign.status).toBe('active');

            done();
          });// eo it

        });// eo describe

        describe('using overriding config', function () {

          it('should fetch and return with the user\'s events', async function (done) {
            const defaultConfig = new Config({
              apiKey: 'should_be_unused',
              apiSecret: 'should_be_unused',
              apiUrlRoot: 'should_be_unused',
            });
            const overridingConfig = new Config({
              apiKey,
              apiSecret,
              apiUrlRoot,
            });

            const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
            const response = await consentsSdk.listCampaigns(null, null, overridingConfig);
            expect(response).toBeInstanceOf(PagingResponse);
            expect(response.hasNextPage()).toBe(false);
            const nextPageResponse = await response.getNextPage();
            expect(nextPageResponse).toBe(null);
            const { result } = response;
            expect(result).toBeDefined();
            expect(result.page_info).toBeDefined();
            expect(result.page_info.end_cursor).toBe('KGyAdqa9//owg9NvMGdRlTNrkAet748qYDRsNXlFtGtmWL/kfZ0+ep2MoZ1UKSpSOigHASNIf3iMOlb+bp1RGE9Xct534ynXaUqDDK9Mc8w=');
            expect(result.page_info.has_next_page).toBeNull();
            const campaigns = result.data;
            expect(campaigns).toBeInstanceOf(Array);
            expect(campaigns.length).toBe(1);
            const campaign = campaigns[0];
            expect(campaign).toBeDefined();
            expect(campaign.campaign_cursor).toBe('CTZamTgKRBUqJsavV4+R8NnwaIv/mcLqI+enjUFlcARTKRidhcY4K0rbAb4KJDIL1uaaAA==');
            expect(campaign.campaign_name).toBe('xcoobee test campaign');
            expect(campaign.status).toBe('active');

            done();
          });// eo it

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const response = await consentsSdk.listCampaigns();
          expect(response).toBeDefined();
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');

          done();
        });// eo it

      });// eo describe

    });// eo describe('.listCampaigns')

    describe('.listConsents', function () {

      describe('called with a valid API key/secret pair', function () {

        describe('but no consent status', function () {

          describe('using default config', function () {

            it('should fetch and return with the user\'s consents of any status', async function (done) {
              const defaultConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const response = await consentsSdk.listConsents();
              expect(response).toBeInstanceOf(PagingResponse);
              expect(response.hasNextPage()).toBe(false);
              const nextPageResponse = await response.getNextPage();
              expect(nextPageResponse).toBe(null);
              const { result } = response;
              expect(result).toBeDefined();
              expect(result.page_info).toBeDefined();
              expect(result.page_info.end_cursor).toBe('KGyAdqa9//owg9NvMGdRlTNrkAet748qYDRsNXhLtGlgWL3mfZw7DvGY6+UkKSNSLCg+ATVIT3iaOmj+eJ13SkFPOZlm9zjOaFeADKhGYZ8OloFX');
              expect(result.page_info.has_next_page).toBeNull();
              const consents = result.data;
              expect(consents).toBeInstanceOf(Array);
              expect(consents.length).toBeGreaterThan(0);
              let consent = consents[0];
              expect('consent_cursor' in consent).toBe(true);
              assertIsCursorLike(consent.consent_cursor);
              expect('consent_status' in consent).toBe(true);
              expect('date_c' in consent).toBe(true);
              assertIso8601Like(consent.date_c)
              expect('date_e' in consent).toBe(true);
              assertIso8601Like(consent.date_e)
              expect('user_xcoobee_id' in consent).toBe(true);

              done();
            });// eo it

          });// eo describe

          describe('using overriding config', function () {

            it('should fetch and return with the user\'s consents of any status', async function (done) {
              const defaultConfig = new Config({
                apiKey: 'should_be_unused',
                apiSecret: 'should_be_unused',
                apiUrlRoot: 'should_be_unused',
              });
              const overridingConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const response = await consentsSdk.listConsents(null, null, null, overridingConfig);
              expect(response).toBeInstanceOf(PagingResponse);
              expect(response.hasNextPage()).toBe(false);
              const nextPageResponse = await response.getNextPage();
              expect(nextPageResponse).toBe(null);
              const { result } = response;
              expect(result).toBeDefined();
              expect(result.page_info).toBeDefined();
              expect(result.page_info.end_cursor).toBe('KGyAdqa9//owg9NvMGdRlTNrkAet748qYDRsNXhLtGlgWL3mfZw7DvGY6+UkKSNSLCg+ATVIT3iaOmj+eJ13SkFPOZlm9zjOaFeADKhGYZ8OloFX');
              expect(result.page_info.has_next_page).toBeNull();
              const consents = result.data;
              expect(consents).toBeInstanceOf(Array);
              expect(consents.length).toBeGreaterThan(0);
              let consent = consents[0];
              expect('consent_cursor' in consent).toBe(true);
              assertIsCursorLike(consent.consent_cursor);
              expect('consent_status' in consent).toBe(true);
              expect('date_c' in consent).toBe(true);
              assertIso8601Like(consent.date_c)
              expect('date_e' in consent).toBe(true);
              assertIso8601Like(consent.date_e)
              expect('user_xcoobee_id' in consent).toBe(true);

              done();
            });// eo it

          });// eo describe

          describe('and called with a limit', function () {

            describe('using default config', function () {

              it('should fetch and return with the user\'s consents of any status', async function (done) {
                const defaultConfig = new Config({
                  apiKey,
                  apiSecret,
                  apiUrlRoot,
                });

                const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
                const response = await consentsSdk.listConsents(null, null, 25);
                expect(response).toBeInstanceOf(PagingResponse);
                let { result } = response;
                expect(result).toBeDefined();
                let consents = result.data;
                expect(consents).toBeInstanceOf(Array);
                expect(consents.length).toBe(25);
                let consent = consents[0];
                expect('consent_cursor' in consent).toBe(true);
                assertIsCursorLike(consent.consent_cursor);
                expect('consent_status' in consent).toBe(true);
                expect('date_c' in consent).toBe(true);
                assertIso8601Like(consent.date_c)
                expect('date_e' in consent).toBe(true);
                assertIso8601Like(consent.date_e)
                expect('user_xcoobee_id' in consent).toBe(true);

                expect(response.hasNextPage()).toBe(true);
                let nextPageResponse = await response.getNextPage();
                expect(nextPageResponse).toBeInstanceOf(PagingResponse);
                result = nextPageResponse.result;
                expect(result).toBeDefined();
                consents = result.data;
                expect(consents).toBeInstanceOf(Array);
                expect(consents.length).toBe(25);

                expect(nextPageResponse.hasNextPage()).toBe(true);
                nextPageResponse = await nextPageResponse.getNextPage();
                expect(nextPageResponse).toBeInstanceOf(PagingResponse);
                result = nextPageResponse.result;
                expect(result).toBeDefined();
                consents = result.data;
                expect(consents).toBeInstanceOf(Array);
                expect(consents.length).toBeGreaterThan(0);

                done();
              });// eo it

            });// eo describe

          });// eo describe

        });// eo describe

        describe('and active consent status', function () {

          describe('using default config', function () {

            it('should fetch and return with the user\'s active consents', async function (done) {
              const defaultConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const response = await consentsSdk.listConsents(ConsentStatuses.ACTIVE);
              expect(response).toBeInstanceOf(PagingResponse);
              expect(response.hasNextPage()).toBe(false);
              const nextPageResponse = await response.getNextPage();
              expect(nextPageResponse).toBe(null);
              const { result } = response;
              expect(result).toBeDefined();
              expect(result.page_info).toBeDefined();
              expect(result.page_info.end_cursor).toBe(null);
              expect(result.page_info.has_next_page).toBe(null);
              const consents = result.data;
              expect(consents).toBeInstanceOf(Array);
              expect(consents.length).toBe(0);
              // let consent = consents[0];
              // expect('consent_cursor' in consent).toBe(true);
              // assertIsCursorLike(consent.consent_cursor);
              // expect('consent_status' in consent).toBe(true);
              // expect('date_c' in consent).toBe(true);
              // assertIso8601Like(consent.date_c)
              // expect('date_e' in consent).toBe(true);
              // assertIso8601Like(consent.date_e)
              // expect('user_xcoobee_id' in consent).toBe(true);

              done();
            });// eo it

          });// eo describe

          describe('using overriding config', function () {

            it('should fetch and return with the user\'s active consents', async function (done) {
              const defaultConfig = new Config({
                apiKey: 'should_be_unused',
                apiSecret: 'should_be_unused',
                apiUrlRoot: 'should_be_unused',
              });
              const overridingConfig = new Config({
                apiKey,
                apiSecret,
                apiUrlRoot,
              });

              const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
              const response = await consentsSdk.listConsents(ConsentStatuses.ACTIVE, null, null, overridingConfig);
              expect(response).toBeInstanceOf(PagingResponse);
              expect(response.hasNextPage()).toBe(false);
              const nextPageResponse = await response.getNextPage();
              expect(nextPageResponse).toBe(null);
              const { result } = response;
              expect(result).toBeDefined();
              expect(result.page_info).toBeDefined();
              expect(result.page_info.end_cursor).toBe(null);
              expect(result.page_info.has_next_page).toBe(null);
              const consents = result.data;
              expect(consents).toBeInstanceOf(Array);
              expect(consents.length).toBe(0);
              // let consent = consents[0];
              // expect('consent_cursor' in consent).toBe(true);
              // assertIsCursorLike(consent.consent_cursor);
              // expect('consent_status' in consent).toBe(true);
              // expect('date_c' in consent).toBe(true);
              // assertIso8601Like(consent.date_c)
              // expect('date_e' in consent).toBe(true);
              // assertIso8601Like(consent.date_e)
              // expect('user_xcoobee_id' in consent).toBe(true);

              done();
            });// eo it

          });// eo describe

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const consentStatus = 'does not matter';
          const response = await consentsSdk.listConsents(consentStatus);
          expect(response).toBeDefined();
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');

          done();
        });// eo it

      });// eo describe

    });// eo describe('.listConsents')

    describe('.requestConsent', function () {

      describe('called with a valid API key/secret pair', function () {

        describe('using default config', function () {

          it('should succeed and return with given reference', async function (done) {
            const defaultConfig = new Config({
              apiKey,
              apiSecret,
              apiUrlRoot,
            });

            const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
            const xcoobeeId = '~SDKTester_Developer';
            const campaignId = 'CTZamTgKRBUqJsavV4+R8NnwaIv/mcLqI+enjUFlcARTKRidhcY4K0rbAb4KJDIL1uaaAA==';
            const referenceId = 'asdfasdf';
            const response = await consentsSdk.requestConsent(xcoobeeId, referenceId, campaignId);
            expect(response).toBeInstanceOf(SuccessResponse);
            const { result } = response;
            expect(result).toBeDefined();
            expect(result.ref_id).toBe(referenceId);

            done();
          });// eo it

        });// eo describe

        describe('using overriding config', function () {

          it('should succeed and return with given reference', async function (done) {
            const defaultConfig = new Config({
              apiKey: 'should_be_unused',
              apiSecret: 'should_be_unused',
              apiUrlRoot: 'should_be_unused',
            });
            const overridingConfig = new Config({
              apiKey,
              apiSecret,
              apiUrlRoot,
            });

            const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
            const xcoobeeId = '~SDKTester_Developer';
            const campaignId = 'CTZamTgKRBUqJsavV4+R8NnwaIv/mcLqI+enjUFlcARTKRidhcY4K0rbAb4KJDIL1uaaAA==';
            const referenceId = 'asdfasdf';
            const response = await consentsSdk.requestConsent(xcoobeeId, referenceId, campaignId, overridingConfig);
            expect(response).toBeInstanceOf(SuccessResponse);
            const { result } = response;
            expect(result).toBeDefined();
            expect(result.ref_id).toBe(referenceId);

            done();
          });// eo it

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const xcoobeeId = 'does not matter';
          const campaignId = 'does not matter';
          const referenceId = 'does not matter';
          const response = await consentsSdk.requestConsent(xcoobeeId, campaignId, referenceId);
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');
          done();
        });// eo it

      });// eo describe

    });// eo describe('.requestConsent')

    describe('.setUserDataResponse', function () {

      describe('called with a valid API key/secret pair', function () {

        describe('using default config', function () {

          it('should succeed and return progress report', async function (done) {
            const defaultConfig = new Config({
              apiKey,
              apiSecret,
              apiUrlRoot,
            });

            const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
            const message = 'Here are the files you requested.';
            const consentId = 'CTZamTgKFkJyf5ujU9yR9NT2Pov/z8C+I+SmiUxlIQQCc0yY0ctiLxrbAb4KJDIL1uiaAA==';
            const referenceId = 'someUniqueReferenceId';
            const file = Path.resolve(__dirname, '..', '..', '..', 'assets', 'user-data.txt');
            const files = [file];
            const response = await consentsSdk.setUserDataResponse(message, consentId, referenceId, files);
            expect(response).toBeInstanceOf(SuccessResponse);
            const { result } = response;
            expect(result).toBeDefined();
            expect(result.progress).toBeInstanceOf(Array);
            expect(result.progress.length).toBe(3);
            expect(result.progress[0]).toBe('successfully sent message');
            expect(result.progress[1]).toMatch(/successfully uploaded .*user-data\.txt/);
            expect(result.progress[2]).toBe('successfully sent successfully uploaded files to destination');
            expect(result.ref_id).toBeDefined();

            done();
          });// eo it

        });// eo describe

        describe('using overriding config', function () {

          it('should succeed and return progress report', async function (done) {
            const defaultConfig = new Config({
              apiKey: 'should_be_unused',
              apiSecret: 'should_be_unused',
              apiUrlRoot: 'should_be_unused',
            });
            const overridingConfig = new Config({
              apiKey,
              apiSecret,
              apiUrlRoot,
            });

            const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
            const message = 'Here are the files you requested.';
            const consentId = 'CTZamTgKFkJyf5ujU9yR9NT2Pov/z8C+I+SmiUxlIQQCc0yY0ctiLxrbAb4KJDIL1uiaAA==';
            const referenceId = 'someUniqueReferenceId';
            const file = Path.resolve(__dirname, '..', '..', '..', 'assets', 'user-data.dat');
            const files = [file];
            const response = await consentsSdk.setUserDataResponse(message, consentId, referenceId, files, overridingConfig);
            expect(response).toBeInstanceOf(SuccessResponse);
            const { result } = response;
            expect(result).toBeDefined();
            expect(result.progress).toBeInstanceOf(Array);
            expect(result.progress.length).toBe(3);
            expect(result.progress[0]).toBe('successfully sent message');
            expect(result.progress[1]).toMatch(/successfully uploaded .*user-data\.dat/);
            expect(result.progress[2]).toBe('successfully sent successfully uploaded files to destination');
            expect(result.ref_id).toBeDefined();

            done();
          });// eo it

        });// eo describe

      });// eo describe

      describe('called with an invalid API key/secret pair', function () {

        it('should return with an error response', async function (done) {
          const defaultConfig = new Config({
            apiKey: 'invalid',
            apiSecret: 'invalid',
            apiUrlRoot,
          });

          const consentsSdk = new Consents(defaultConfig, apiAccessTokenCache, usersCache);
          const message = 'does not matter';
          const consentId = 'does not matter';
          const referenceId = 'does not matter';
          const files = [];
          const response = await consentsSdk.setUserDataResponse(message, consentId, referenceId, files);
          expect(response).toBeDefined();
          expect(response).toBeInstanceOf(ErrorResponse);
          expect(response.code).toBe(400);
          expect(response.error.message).toBe('Unable to get an API access token.');
          done();
        });// eo it

      });// eo describe

    });// eo describe('.setUserDataResponse')

  });// eo describe('instance')

});// eo describe('Consents')
