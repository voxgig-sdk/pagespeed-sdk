"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RunPagespeedEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PAGESPEED_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PAGESPEED_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PagespeedSDK.test();
        const ent = testsdk.RunPagespeed();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PAGESPEED_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'run_pagespeed.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "analysisUTCTimestamp": { "a": true, "h": "Analysis Utc Timestamp", "n": "analysisUTCTimestamp", "r": false, "sh": "The UTC timestamp of this analysis", "t": "`$STRING`", "key$": "analysisUTCTimestamp", "index$": 0 }, "captchaResult": { "a": true, "h": "Captcha Result", "n": "captchaResult", "r": false, "sh": "The captcha verify result", "t": "`$STRING`", "key$": "captchaResult", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Canonicalized and final URL for the document, after following page redirects (if any)", "t": "`$STRING`", "key$": "id", "index$": 2 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": false, "sh": "Kind of result", "t": "`$STRING`", "key$": "kind", "index$": 3 }, "lighthouseResult": { "a": true, "h": "Lighthouse Result", "n": "lighthouseResult", "r": false, "sh": "The Lighthouse result object", "t": "`$OBJECT`", "key$": "lighthouseResult", "index$": 4 }, "loadingExperience": { "a": true, "h": "Loading Experience", "n": "loadingExperience", "r": false, "sh": "The CrUX loading experience object that contains CrUX data breakdowns", "t": "`$OBJECT`", "key$": "loadingExperience", "index$": 5 }, "originLoadingExperience": { "a": true, "h": "Origin Loading Experience", "n": "originLoadingExperience", "r": false, "sh": "The CrUX loading experience object that contains CrUX data breakdowns", "t": "`$OBJECT`", "key$": "originLoadingExperience", "index$": 6 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "sh": "The Pagespeed Version object", "t": "`$OBJECT`", "key$": "version", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "run_pagespeed", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /runPagespeed", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "captcha_token", "or": "captcha_token", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "category", "or": "category", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "k": "query", "n": "locale", "or": "locale", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "DESKTOP", "k": "query", "n": "strategy", "or": "strategy", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "url", "or": "url", "r": true, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "utm_campaign", "or": "utm_campaign", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "utm_source", "or": "utm_source", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/runPagespeed", "q": { "exist": ["captcha_token", "category", "locale", "strategy", "url", "utm_campaign", "utm_source"] }, "r": {}, "s": [{ "lit": "runPagespeed" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "run_pagespeed", "name__orig": "run_pagespeed", "Name": "RunPagespeed", "name_": "run_pagespeed", "name-": "run-pagespeed", "NAME": "RUN_PAGESPEED", "index$": 0 }, { "active": true, "entity": "run_pagespeed", "key$": "BasicRunPagespeedFlow", "kind": "basic", "name": "BasicRunPagespeedFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "run_pagespeed_ref01", "srcdatavar": "run_pagespeed_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-run_pagespeed_ref01" } }], "index$": 0 }] }, 'RunPagespeed', { "GET /runPagespeed": { "protocol": "http", "operationId": "pagespeedapi.runpagespeed", "responses": { "200": { "description": "Successful response with PageSpeed analysis results", "content": { "application/json": { "schema": { "type": "object", "description": "The Pagespeed API response object", "properties": { "kind": { "description": "Kind of result", "key$": "kind", "type": "string" }, "captchaResult": { "description": "The captcha verify result", "key$": "captchaResult", "type": "string" }, "id": { "description": "Canonicalized and final URL for the document, after following page redirects (if any)", "key$": "id", "type": "string" }, "loadingExperience": { "description": "The CrUX loading experience object that contains CrUX data breakdowns", "key$": "loadingExperience", "properties": { "id": { "description": "The url, pattern or origin which the metrics are on", "type": "string" }, "initial_url": { "description": "The requested URL, which may differ from the resolved id", "type": "string" }, "metrics": { "additionalProperties": { "description": "User page load metric data", "properties": { "category": { "type": "string" }, "distributions": { "items": { "properties": { "max": { "type": "number" }, "min": { "type": "number" }, "proportion": { "type": "number" } }, "type": "object" }, "type": "array" }, "percentile": { "description": "Percentile value for the metric", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/UserPageLoadMetricV5" }, "description": "The map of metrics and data", "type": "object" }, "origin_fallback": { "description": "True if the result is an origin fallback from a page, false otherwise", "type": "boolean" }, "overall_category": { "description": "The human readable speed category of the id", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PagespeedApiLoadingExperienceV5" }, "originLoadingExperience": { "description": "The CrUX loading experience object that contains CrUX data breakdowns", "key$": "originLoadingExperience", "properties": { "id": { "description": "The url, pattern or origin which the metrics are on", "type": "string" }, "initial_url": { "description": "The requested URL, which may differ from the resolved id", "type": "string" }, "metrics": { "additionalProperties": { "description": "User page load metric data", "properties": { "category": { "type": "string" }, "distributions": { "items": { "properties": { "max": { "type": "number" }, "min": { "type": "number" }, "proportion": { "type": "number" } }, "type": "object" }, "type": "array" }, "percentile": { "description": "Percentile value for the metric", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/UserPageLoadMetricV5" }, "description": "The map of metrics and data", "type": "object" }, "origin_fallback": { "description": "True if the result is an origin fallback from a page, false otherwise", "type": "boolean" }, "overall_category": { "description": "The human readable speed category of the id", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PagespeedApiLoadingExperienceV5" }, "analysisUTCTimestamp": { "description": "The UTC timestamp of this analysis", "key$": "analysisUTCTimestamp", "type": "string" }, "lighthouseResult": { "description": "The Lighthouse result object", "key$": "lighthouseResult", "properties": { "audits": { "additionalProperties": { "description": "A Lighthouse audit result", "properties": { "description": { "type": "string" }, "displayValue": { "type": "string" }, "id": { "type": "string" }, "numericUnit": { "type": "string" }, "numericValue": { "type": "number" }, "score": { "nullable": true, "type": "number" }, "scoreDisplayMode": { "type": "string" }, "title": { "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/LighthouseAuditResultV5" }, "description": "Map of audits in the LHR", "type": "object" }, "categories": { "description": "The categories in a Lighthouse run", "properties": { "accessibility": { "description": "A Lighthouse category", "properties": { "auditRefs": { "description": "An array of references to all the audit members of this category", "items": { "description": "A light reference to an audit by id, used to group and weight audits in a given category", "properties": { "group": { "description": "The category group that the audit belongs to (optional)", "type": "string" }, "id": { "description": "The audit ref id", "type": "string" }, "weight": { "description": "The weight this audit's score has on the overall category score", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/AuditRefs" }, "type": "array" }, "description": { "description": "A more detailed description of the category and its importance", "type": "string" }, "id": { "description": "The string identifier of the category", "type": "string" }, "manualDescription": { "description": "A description for the manual audits in the category", "type": "string" }, "score": { "description": "The overall score of the category, the weighted average of all its audits", "nullable": true, "type": "number" }, "title": { "description": "The human-friendly name of the category", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/LighthouseCategoryV5" }, "best-practices": { "description": "A Lighthouse category", "properties": { "auditRefs": { "description": "An array of references to all the audit members of this category", "items": { "description": "A light reference to an audit by id, used to group and weight audits in a given category", "properties": { "group": { "description": "The category group that the audit belongs to (optional)", "type": "string" }, "id": { "description": "The audit ref id", "type": "string" }, "weight": { "description": "The weight this audit's score has on the overall category score", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/AuditRefs" }, "type": "array" }, "description": { "description": "A more detailed description of the category and its importance", "type": "string" }, "id": { "description": "The string identifier of the category", "type": "string" }, "manualDescription": { "description": "A description for the manual audits in the category", "type": "string" }, "score": { "description": "The overall score of the category, the weighted average of all its audits", "nullable": true, "type": "number" }, "title": { "description": "The human-friendly name of the category", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/LighthouseCategoryV5" }, "performance": { "description": "A Lighthouse category", "properties": { "auditRefs": { "description": "An array of references to all the audit members of this category", "items": { "description": "A light reference to an audit by id, used to group and weight audits in a given category", "properties": { "group": { "description": "The category group that the audit belongs to (optional)", "type": "string" }, "id": { "description": "The audit ref id", "type": "string" }, "weight": { "description": "The weight this audit's score has on the overall category score", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/AuditRefs" }, "type": "array" }, "description": { "description": "A more detailed description of the category and its importance", "type": "string" }, "id": { "description": "The string identifier of the category", "type": "string" }, "manualDescription": { "description": "A description for the manual audits in the category", "type": "string" }, "score": { "description": "The overall score of the category, the weighted average of all its audits", "nullable": true, "type": "number" }, "title": { "description": "The human-friendly name of the category", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/LighthouseCategoryV5" }, "seo": { "description": "A Lighthouse category", "properties": { "auditRefs": { "description": "An array of references to all the audit members of this category", "items": { "description": "A light reference to an audit by id, used to group and weight audits in a given category", "properties": { "group": { "description": "The category group that the audit belongs to (optional)", "type": "string" }, "id": { "description": "The audit ref id", "type": "string" }, "weight": { "description": "The weight this audit's score has on the overall category score", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/AuditRefs" }, "type": "array" }, "description": { "description": "A more detailed description of the category and its importance", "type": "string" }, "id": { "description": "The string identifier of the category", "type": "string" }, "manualDescription": { "description": "A description for the manual audits in the category", "type": "string" }, "score": { "description": "The overall score of the category, the weighted average of all its audits", "nullable": true, "type": "number" }, "title": { "description": "The human-friendly name of the category", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/LighthouseCategoryV5" } }, "type": "object", "x-ref": "#/components/schemas/Categories" }, "categoryGroups": { "additionalProperties": { "description": "A category group", "properties": { "description": { "type": "string" }, "title": { "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/CategoryGroupV5" }, "description": "Map of category groups in the LHR", "type": "object" }, "configSettings": { "description": "Message containing the configuration settings for the Lighthouse run", "properties": { "channel": { "description": "How Lighthouse was run, e.g. from the Chrome extension or from the npm module", "type": "string" }, "emulatedFormFactor": { "deprecated": true, "description": "The form factor the emulation should use (deprecated, use formFactor instead)", "type": "string" }, "formFactor": { "description": "How Lighthouse should interpret this run in regards to scoring performance metrics and skipping mobile-only tests in desktop", "type": "string" }, "locale": { "description": "The locale setting", "type": "string" }, "onlyCategories": { "description": "List of categories of audits the run should conduct", "items": { "type": "string" }, "type": "array" } }, "type": "object", "x-ref": "#/components/schemas/ConfigSettings" }, "environment": { "description": "Message containing environment configuration for a Lighthouse run", "properties": { "benchmarkIndex": { "description": "The benchmark index number that indicates rough device class", "type": "number" }, "hostUserAgent": { "description": "The user agent string of the version of Chrome used", "type": "string" }, "networkUserAgent": { "description": "The user agent string that was sent over the network", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Environment" }, "fetchTime": { "description": "The time that this run was fetched", "type": "string" }, "finalUrl": { "description": "The final resolved url that was audited", "type": "string" }, "i18n": { "description": "Message containing the i18n data for the LHR", "properties": { "rendererFormattedStrings": { "description": "Message holding the formatted strings used in the renderer", "properties": { "auditGroupExpandTooltip": { "description": "The tooltip text on an expandable chevron icon", "type": "string" }, "crcInitialNavigation": { "description": "The label for the initial request in a critical request chain", "type": "string" }, "crcLongestDurationLabel": { "description": "The label for values shown in the summary of critical request chains", "type": "string" }, "errorLabel": { "description": "The label shown next to an audit or metric that has had an error", "type": "string" }, "errorMissingAuditInfo": { "description": "The error string shown next to an erroring audit", "type": "string" }, "labDataTitle": { "description": "The title of the lab data performance category", "type": "string" }, "lsPerformanceCategoryDescription": { "description": "The disclaimer shown under performance explaining that the network can vary", "type": "string" }, "manualAuditsGroupTitle": { "description": "The heading shown above a list of audits that were not computed in the run", "type": "string" }, "notApplicableAuditsGroupTitle": { "description": "The heading shown above a list of audits that do not apply to a page", "type": "string" }, "opportunityResourceColumnLabel": { "description": "The heading for the estimated page load savings opportunity of an audit", "type": "string" }, "opportunitySavingsColumnLabel": { "description": "The heading for the estimated page load savings of opportunity audits", "type": "string" }, "passedAuditsGroupTitle": { "description": "The heading that is shown above a list of audits that are passing", "type": "string" }, "scorescaleLabel": { "description": "The label that explains the score gauges scale (0-49, 50-89, 90-100)", "type": "string" }, "toplevelWarningsMessage": { "description": "The label shown preceding important warnings that may have invalidated an entire report", "type": "string" }, "varianceDisclaimer": { "description": "The disclaimer shown below a performance metric value", "type": "string" }, "warningHeader": { "description": "The label shown above a bulleted list of warnings", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/RendererFormattedStrings" } }, "type": "object", "x-ref": "#/components/schemas/I18n" }, "lighthouseVersion": { "description": "The lighthouse version that was used to generate this LHR", "type": "string" }, "requestedUrl": { "description": "The original requested url", "type": "string" }, "runWarnings": { "description": "List of all run warnings in the LHR", "items": { "type": "string" }, "type": "array" }, "runtimeError": { "description": "Message containing a runtime error config", "properties": { "code": { "description": "The enumerated Lighthouse Error code", "type": "string" }, "message": { "description": "A human readable message explaining the error code", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/RuntimeError" }, "stackPacks": { "description": "The Stack Pack advice strings", "items": { "description": "Message containing Stack Pack information", "properties": { "descriptions": { "additionalProperties": { "type": "string" }, "description": "The stack pack advice strings", "type": "object" }, "iconDataURL": { "description": "The stack pack icon data uri", "type": "string" }, "id": { "description": "The stack pack id", "type": "string" }, "title": { "description": "The stack pack title", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/StackPack" }, "type": "array" }, "timing": { "description": "Message containing the performance timing data for the Lighthouse run", "properties": { "total": { "description": "The total duration of Lighthouse's run", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/Timing" }, "userAgent": { "description": "The user agent that was used to run this LHR", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/LighthouseResultV5" }, "version": { "description": "The Pagespeed Version object", "key$": "version", "properties": { "major": { "description": "The major version number of PageSpeed used to generate these results", "type": "string" }, "minor": { "description": "The minor version number of PageSpeed used to generate these results", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PagespeedVersion" } }, "x-ref": "#/components/schemas/PagespeedApiResponse", "index$": 0 } } } }, "400": { "description": "Bad request - invalid parameters" }, "401": { "description": "Unauthorized - authentication required" }, "403": { "description": "Forbidden - insufficient permissions" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "url", "in": "query", "description": "Required. The URL to fetch and analyze", "required": true, "schema": { "type": "string", "format": "uri" }, "index$": 0 }, { "name": "category", "in": "query", "description": "A Lighthouse category to run; if none are given, only Performance category will be run", "required": false, "schema": { "type": "array", "items": { "type": "string", "enum": ["ACCESSIBILITY", "BEST_PRACTICES", "PERFORMANCE", "SEO"] } }, "explode": true, "index$": 1 }, { "name": "locale", "in": "query", "description": "The locale used to localize formatted results", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "name": "strategy", "in": "query", "description": "The analysis strategy (desktop or mobile) to use, and desktop is the default", "required": false, "schema": { "type": "string", "enum": ["DESKTOP", "MOBILE"], "default": "DESKTOP" }, "index$": 3 }, { "name": "utm_campaign", "in": "query", "description": "Campaign name for analytics", "required": false, "schema": { "type": "string" }, "index$": 4 }, { "name": "utm_source", "in": "query", "description": "Campaign source for analytics", "required": false, "schema": { "type": "string" }, "index$": 5 }, { "name": "captchaToken", "in": "query", "description": "The captcha token passed when filling out a captcha", "required": false, "schema": { "type": "string" }, "index$": 6 }], "security": [{ "oauth2": ["openid"] }, { "apiKey": [] }], "securitySource": "operation", "securitySchemes": { "oauth2": { "type": "oauth2", "description": "OAuth 2.0 authentication", "flows": { "implicit": { "authorizationUrl": "https://accounts.google.com/o/oauth2/auth", "scopes": { "openid": "OpenID Connect scope" } }, "authorizationCode": { "authorizationUrl": "https://accounts.google.com/o/oauth2/auth", "tokenUrl": "https://oauth2.googleapis.com/token", "scopes": { "openid": "OpenID Connect scope" } } } }, "apiKey": { "type": "apiKey", "name": "key", "in": "query", "description": "API key for authentication" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let run_pagespeed_ref01_data = Object.values(setup.data.existing.run_pagespeed)[0];
        // LOAD
        const run_pagespeed_ref01_ent = client.RunPagespeed();
        const run_pagespeed_ref01_match_dt0 = {};
        run_pagespeed_ref01_match_dt0.id = run_pagespeed_ref01_data.id;
        const run_pagespeed_ref01_data_dt0 = (await run_pagespeed_ref01_ent.load(run_pagespeed_ref01_match_dt0)).data();
        (0, node_assert_1.default)(run_pagespeed_ref01_data_dt0.id === run_pagespeed_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/run_pagespeed/RunPagespeedTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PagespeedSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['run_pagespeed01', 'run_pagespeed02', 'run_pagespeed03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PAGESPEED_TEST_RUN_PAGESPEED_ENTID': idmap,
        'PAGESPEED_TEST_LIVE': 'FALSE',
        'PAGESPEED_TEST_EXPLAIN': 'FALSE',
        'PAGESPEED_APIKEY': '',
    });
    idmap = env['PAGESPEED_TEST_RUN_PAGESPEED_ENTID'];
    const live = 'TRUE' === env.PAGESPEED_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PAGESPEED_TEST_RUN_PAGESPEED_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PagespeedSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.PAGESPEED_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PAGESPEED_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=RunPagespeedEntity.test.js.map