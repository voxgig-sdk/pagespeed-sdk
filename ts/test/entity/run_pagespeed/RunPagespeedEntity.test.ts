

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PagespeedSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('RunPagespeedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PAGESPEED_TEST_LIVE=TRUE.
  afterEach(liveDelay('PAGESPEED_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PagespeedSDK.test()
    const ent = testsdk.RunPagespeed()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PAGESPEED_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'run_pagespeed.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"analysisUTCTimestamp","req":false,"short":"The UTC timestamp of this analysis","type":"`$STRING`","index$":0},{"active":true,"name":"captchaResult","req":false,"short":"The captcha verify result","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Canonicalized and final URL for the document, after following page redirects (if any)","type":"`$STRING`","index$":2},{"active":true,"name":"kind","req":false,"short":"Kind of result","type":"`$STRING`","index$":3},{"active":true,"name":"lighthouseResult","req":false,"short":"The Lighthouse result object","type":"`$OBJECT`","index$":4},{"active":true,"name":"loadingExperience","req":false,"short":"The CrUX loading experience object that contains CrUX data breakdowns","type":"`$OBJECT`","index$":5},{"active":true,"name":"originLoadingExperience","req":false,"short":"The CrUX loading experience object that contains CrUX data breakdowns","type":"`$OBJECT`","index$":6},{"active":true,"name":"version","req":false,"short":"The Pagespeed Version object","type":"`$OBJECT`","index$":7}],"id":{"field":"id","name":"id"},"name":"run_pagespeed","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"captcha_token","orig":"captcha_token","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"category","orig":"category","reqd":false,"type":"`$ARRAY`","index$":1},{"active":true,"kind":"query","name":"locale","orig":"locale","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"DESKTOP","kind":"query","name":"strategy","orig":"strategy","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"url","orig":"url","reqd":true,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"utm_campaign","orig":"utm_campaign","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"utm_source","orig":"utm_source","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /runPagespeed","json":"{\"operationId\":\"pagespeedapi.runpagespeed\",\"parameters\":[{\"description\":\"Required. The URL to fetch and analyze\",\"in\":\"query\",\"name\":\"url\",\"required\":true,\"schema\":{\"format\":\"uri\",\"type\":\"string\"}},{\"description\":\"A Lighthouse category to run; if none are given, only Performance category will be run\",\"explode\":true,\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"items\":{\"enum\":[\"ACCESSIBILITY\",\"BEST_PRACTICES\",\"PERFORMANCE\",\"SEO\"],\"type\":\"string\"},\"type\":\"array\"}},{\"description\":\"The locale used to localize formatted results\",\"in\":\"query\",\"name\":\"locale\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"The analysis strategy (desktop or mobile) to use, and desktop is the default\",\"in\":\"query\",\"name\":\"strategy\",\"required\":false,\"schema\":{\"default\":\"DESKTOP\",\"enum\":[\"DESKTOP\",\"MOBILE\"],\"type\":\"string\"}},{\"description\":\"Campaign name for analytics\",\"in\":\"query\",\"name\":\"utm_campaign\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Campaign source for analytics\",\"in\":\"query\",\"name\":\"utm_source\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"The captcha token passed when filling out a captcha\",\"in\":\"query\",\"name\":\"captchaToken\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"The Pagespeed API response object\",\"properties\":{\"analysisUTCTimestamp\":{\"description\":\"The UTC timestamp of this analysis\",\"type\":\"string\"},\"captchaResult\":{\"description\":\"The captcha verify result\",\"type\":\"string\"},\"id\":{\"description\":\"Canonicalized and final URL for the document, after following page redirects (if any)\",\"type\":\"string\"},\"kind\":{\"description\":\"Kind of result\",\"type\":\"string\"},\"lighthouseResult\":{\"description\":\"The Lighthouse result object\",\"properties\":{\"audits\":{\"additionalProperties\":{\"description\":\"A Lighthouse audit result\",\"properties\":{\"description\":{\"type\":\"string\"},\"displayValue\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"numericUnit\":{\"type\":\"string\"},\"numericValue\":{\"type\":\"number\"},\"score\":{\"nullable\":true,\"type\":\"number\"},\"scoreDisplayMode\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"Map of audits in the LHR\",\"type\":\"object\"},\"categories\":{\"description\":\"The categories in a Lighthouse run\",\"properties\":{\"accessibility\":{\"description\":\"A Lighthouse category\",\"properties\":{\"auditRefs\":{\"description\":\"An array of references to all the audit members of this category\",\"items\":{\"description\":\"A light reference to an audit by id, used to group and weight audits in a given category\",\"properties\":{\"group\":{\"description\":\"The category group that the audit belongs to (optional)\",\"type\":\"string\"},\"id\":{\"description\":\"The audit ref id\",\"type\":\"string\"},\"weight\":{\"description\":\"The weight this audit's score has on the overall category score\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"description\":{\"description\":\"A more detailed description of the category and its importance\",\"type\":\"string\"},\"id\":{\"description\":\"The string identifier of the category\",\"type\":\"string\"},\"manualDescription\":{\"description\":\"A description for the manual audits in the category\",\"type\":\"string\"},\"score\":{\"description\":\"The overall score of the category, the weighted average of all its audits\",\"nullable\":true,\"type\":\"number\"},\"title\":{\"description\":\"The human-friendly name of the category\",\"type\":\"string\"}},\"type\":\"object\"},\"best-practices\":{\"description\":\"A Lighthouse category\",\"properties\":{\"auditRefs\":{\"description\":\"An array of references to all the audit members of this category\",\"items\":{\"description\":\"A light reference to an audit by id, used to group and weight audits in a given category\",\"properties\":{\"group\":{\"description\":\"The category group that the audit belongs to (optional)\",\"type\":\"string\"},\"id\":{\"description\":\"The audit ref id\",\"type\":\"string\"},\"weight\":{\"description\":\"The weight this audit's score has on the overall category score\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"description\":{\"description\":\"A more detailed description of the category and its importance\",\"type\":\"string\"},\"id\":{\"description\":\"The string identifier of the category\",\"type\":\"string\"},\"manualDescription\":{\"description\":\"A description for the manual audits in the category\",\"type\":\"string\"},\"score\":{\"description\":\"The overall score of the category, the weighted average of all its audits\",\"nullable\":true,\"type\":\"number\"},\"title\":{\"description\":\"The human-friendly name of the category\",\"type\":\"string\"}},\"type\":\"object\"},\"performance\":{\"description\":\"A Lighthouse category\",\"properties\":{\"auditRefs\":{\"description\":\"An array of references to all the audit members of this category\",\"items\":{\"description\":\"A light reference to an audit by id, used to group and weight audits in a given category\",\"properties\":{\"group\":{\"description\":\"The category group that the audit belongs to (optional)\",\"type\":\"string\"},\"id\":{\"description\":\"The audit ref id\",\"type\":\"string\"},\"weight\":{\"description\":\"The weight this audit's score has on the overall category score\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"description\":{\"description\":\"A more detailed description of the category and its importance\",\"type\":\"string\"},\"id\":{\"description\":\"The string identifier of the category\",\"type\":\"string\"},\"manualDescription\":{\"description\":\"A description for the manual audits in the category\",\"type\":\"string\"},\"score\":{\"description\":\"The overall score of the category, the weighted average of all its audits\",\"nullable\":true,\"type\":\"number\"},\"title\":{\"description\":\"The human-friendly name of the category\",\"type\":\"string\"}},\"type\":\"object\"},\"seo\":{\"description\":\"A Lighthouse category\",\"properties\":{\"auditRefs\":{\"description\":\"An array of references to all the audit members of this category\",\"items\":{\"description\":\"A light reference to an audit by id, used to group and weight audits in a given category\",\"properties\":{\"group\":{\"description\":\"The category group that the audit belongs to (optional)\",\"type\":\"string\"},\"id\":{\"description\":\"The audit ref id\",\"type\":\"string\"},\"weight\":{\"description\":\"The weight this audit's score has on the overall category score\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"description\":{\"description\":\"A more detailed description of the category and its importance\",\"type\":\"string\"},\"id\":{\"description\":\"The string identifier of the category\",\"type\":\"string\"},\"manualDescription\":{\"description\":\"A description for the manual audits in the category\",\"type\":\"string\"},\"score\":{\"description\":\"The overall score of the category, the weighted average of all its audits\",\"nullable\":true,\"type\":\"number\"},\"title\":{\"description\":\"The human-friendly name of the category\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"categoryGroups\":{\"additionalProperties\":{\"description\":\"A category group\",\"properties\":{\"description\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"description\":\"Map of category groups in the LHR\",\"type\":\"object\"},\"configSettings\":{\"description\":\"Message containing the configuration settings for the Lighthouse run\",\"properties\":{\"channel\":{\"description\":\"How Lighthouse was run, e.g. from the Chrome extension or from the npm module\",\"type\":\"string\"},\"emulatedFormFactor\":{\"deprecated\":true,\"description\":\"The form factor the emulation should use (deprecated, use formFactor instead)\",\"type\":\"string\"},\"formFactor\":{\"description\":\"How Lighthouse should interpret this run in regards to scoring performance metrics and skipping mobile-only tests in desktop\",\"type\":\"string\"},\"locale\":{\"description\":\"The locale setting\",\"type\":\"string\"},\"onlyCategories\":{\"description\":\"List of categories of audits the run should conduct\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"environment\":{\"description\":\"Message containing environment configuration for a Lighthouse run\",\"properties\":{\"benchmarkIndex\":{\"description\":\"The benchmark index number that indicates rough device class\",\"type\":\"number\"},\"hostUserAgent\":{\"description\":\"The user agent string of the version of Chrome used\",\"type\":\"string\"},\"networkUserAgent\":{\"description\":\"The user agent string that was sent over the network\",\"type\":\"string\"}},\"type\":\"object\"},\"fetchTime\":{\"description\":\"The time that this run was fetched\",\"type\":\"string\"},\"finalUrl\":{\"description\":\"The final resolved url that was audited\",\"type\":\"string\"},\"i18n\":{\"description\":\"Message containing the i18n data for the LHR\",\"properties\":{\"rendererFormattedStrings\":{\"description\":\"Message holding the formatted strings used in the renderer\",\"properties\":{\"auditGroupExpandTooltip\":{\"description\":\"The tooltip text on an expandable chevron icon\",\"type\":\"string\"},\"crcInitialNavigation\":{\"description\":\"The label for the initial request in a critical request chain\",\"type\":\"string\"},\"crcLongestDurationLabel\":{\"description\":\"The label for values shown in the summary of critical request chains\",\"type\":\"string\"},\"errorLabel\":{\"description\":\"The label shown next to an audit or metric that has had an error\",\"type\":\"string\"},\"errorMissingAuditInfo\":{\"description\":\"The error string shown next to an erroring audit\",\"type\":\"string\"},\"labDataTitle\":{\"description\":\"The title of the lab data performance category\",\"type\":\"string\"},\"lsPerformanceCategoryDescription\":{\"description\":\"The disclaimer shown under performance explaining that the network can vary\",\"type\":\"string\"},\"manualAuditsGroupTitle\":{\"description\":\"The heading shown above a list of audits that were not computed in the run\",\"type\":\"string\"},\"notApplicableAuditsGroupTitle\":{\"description\":\"The heading shown above a list of audits that do not apply to a page\",\"type\":\"string\"},\"opportunityResourceColumnLabel\":{\"description\":\"The heading for the estimated page load savings opportunity of an audit\",\"type\":\"string\"},\"opportunitySavingsColumnLabel\":{\"description\":\"The heading for the estimated page load savings of opportunity audits\",\"type\":\"string\"},\"passedAuditsGroupTitle\":{\"description\":\"The heading that is shown above a list of audits that are passing\",\"type\":\"string\"},\"scorescaleLabel\":{\"description\":\"The label that explains the score gauges scale (0-49, 50-89, 90-100)\",\"type\":\"string\"},\"toplevelWarningsMessage\":{\"description\":\"The label shown preceding important warnings that may have invalidated an entire report\",\"type\":\"string\"},\"varianceDisclaimer\":{\"description\":\"The disclaimer shown below a performance metric value\",\"type\":\"string\"},\"warningHeader\":{\"description\":\"The label shown above a bulleted list of warnings\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"lighthouseVersion\":{\"description\":\"The lighthouse version that was used to generate this LHR\",\"type\":\"string\"},\"requestedUrl\":{\"description\":\"The original requested url\",\"type\":\"string\"},\"runWarnings\":{\"description\":\"List of all run warnings in the LHR\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"runtimeError\":{\"description\":\"Message containing a runtime error config\",\"properties\":{\"code\":{\"description\":\"The enumerated Lighthouse Error code\",\"type\":\"string\"},\"message\":{\"description\":\"A human readable message explaining the error code\",\"type\":\"string\"}},\"type\":\"object\"},\"stackPacks\":{\"description\":\"The Stack Pack advice strings\",\"items\":{\"description\":\"Message containing Stack Pack information\",\"properties\":{\"descriptions\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"The stack pack advice strings\",\"type\":\"object\"},\"iconDataURL\":{\"description\":\"The stack pack icon data uri\",\"type\":\"string\"},\"id\":{\"description\":\"The stack pack id\",\"type\":\"string\"},\"title\":{\"description\":\"The stack pack title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"timing\":{\"description\":\"Message containing the performance timing data for the Lighthouse run\",\"properties\":{\"total\":{\"description\":\"The total duration of Lighthouse's run\",\"type\":\"number\"}},\"type\":\"object\"},\"userAgent\":{\"description\":\"The user agent that was used to run this LHR\",\"type\":\"string\"}},\"type\":\"object\"},\"loadingExperience\":{\"description\":\"The CrUX loading experience object that contains CrUX data breakdowns\",\"properties\":{\"id\":{\"description\":\"The url, pattern or origin which the metrics are on\",\"type\":\"string\"},\"initial_url\":{\"description\":\"The requested URL, which may differ from the resolved id\",\"type\":\"string\"},\"metrics\":{\"additionalProperties\":{\"description\":\"User page load metric data\",\"properties\":{\"category\":{\"type\":\"string\"},\"distributions\":{\"items\":{\"properties\":{\"max\":{\"type\":\"number\"},\"min\":{\"type\":\"number\"},\"proportion\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"percentile\":{\"description\":\"Percentile value for the metric\",\"type\":\"number\"}},\"type\":\"object\"},\"description\":\"The map of metrics and data\",\"type\":\"object\"},\"origin_fallback\":{\"description\":\"True if the result is an origin fallback from a page, false otherwise\",\"type\":\"boolean\"},\"overall_category\":{\"description\":\"The human readable speed category of the id\",\"type\":\"string\"}},\"type\":\"object\"},\"originLoadingExperience\":{\"description\":\"The CrUX loading experience object that contains CrUX data breakdowns\",\"properties\":{\"id\":{\"description\":\"The url, pattern or origin which the metrics are on\",\"type\":\"string\"},\"initial_url\":{\"description\":\"The requested URL, which may differ from the resolved id\",\"type\":\"string\"},\"metrics\":{\"additionalProperties\":{\"description\":\"User page load metric data\",\"properties\":{\"category\":{\"type\":\"string\"},\"distributions\":{\"items\":{\"properties\":{\"max\":{\"type\":\"number\"},\"min\":{\"type\":\"number\"},\"proportion\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"percentile\":{\"description\":\"Percentile value for the metric\",\"type\":\"number\"}},\"type\":\"object\"},\"description\":\"The map of metrics and data\",\"type\":\"object\"},\"origin_fallback\":{\"description\":\"True if the result is an origin fallback from a page, false otherwise\",\"type\":\"boolean\"},\"overall_category\":{\"description\":\"The human readable speed category of the id\",\"type\":\"string\"}},\"type\":\"object\"},\"version\":{\"description\":\"The Pagespeed Version object\",\"properties\":{\"major\":{\"description\":\"The major version number of PageSpeed used to generate these results\",\"type\":\"string\"},\"minor\":{\"description\":\"The minor version number of PageSpeed used to generate these results\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with PageSpeed analysis results\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"401\":{\"description\":\"Unauthorized - authentication required\"},\"403\":{\"description\":\"Forbidden - insufficient permissions\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"oauth2\":[\"openid\"]},{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth 2.0 authentication\",\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"openid\":\"OpenID Connect scope\"},\"tokenUrl\":\"https://oauth2.googleapis.com/token\"},\"implicit\":{\"authorizationUrl\":\"https://accounts.google.com/o/oauth2/auth\",\"scopes\":{\"openid\":\"OpenID Connect scope\"}}},\"type\":\"oauth2\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/runPagespeed","segments":[{"lit":"runPagespeed"}],"select":{"exist":["captcha_token","category","locale","strategy","url","utm_campaign","utm_source"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"run_pagespeed","name__orig":"run_pagespeed","Name":"RunPagespeed","name_":"run_pagespeed","name-":"run-pagespeed","NAME":"RUN_PAGESPEED","index$":0}, {"active":true,"entity":"run_pagespeed","key$":"BasicRunPagespeedFlow","kind":"basic","name":"BasicRunPagespeedFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"run_pagespeed_ref01","srcdatavar":"run_pagespeed_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-run_pagespeed_ref01"}}],"index$":0}]}, 'RunPagespeed')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let run_pagespeed_ref01_data = Object.values(setup.data.existing.run_pagespeed)[0] as any

    // LOAD
    const run_pagespeed_ref01_ent = client.RunPagespeed()
    const run_pagespeed_ref01_match_dt0: any = {}
    run_pagespeed_ref01_match_dt0.id = run_pagespeed_ref01_data.id
    const run_pagespeed_ref01_data_dt0 = (await run_pagespeed_ref01_ent.load(run_pagespeed_ref01_match_dt0)).data()
    assert(run_pagespeed_ref01_data_dt0.id === run_pagespeed_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/run_pagespeed/RunPagespeedTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PagespeedSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['run_pagespeed01','run_pagespeed02','run_pagespeed03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PAGESPEED_TEST_RUN_PAGESPEED_ENTID': idmap,
    'PAGESPEED_TEST_LIVE': 'FALSE',
    'PAGESPEED_TEST_EXPLAIN': 'FALSE',
    'PAGESPEED_APIKEY': '',
  })

  idmap = env['PAGESPEED_TEST_RUN_PAGESPEED_ENTID']

  const live = 'TRUE' === env.PAGESPEED_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PAGESPEED_TEST_RUN_PAGESPEED_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PagespeedSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
