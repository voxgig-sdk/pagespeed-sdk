"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Pagespeed',
        slug: "pagespeed",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://pagespeedonline.googleapis.com/pagespeedonline/v5",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            run_pagespeed: {},
        }
    };
    entity = {
        "run_pagespeed": {
            "fields": [
                {
                    "name": "analysisUTCTimestamp",
                    "title": "Analysis Utc Timestamp",
                    "type": "`$STRING`",
                    "short": "The UTC timestamp of this analysis"
                },
                {
                    "name": "captchaResult",
                    "title": "Captcha Result",
                    "type": "`$STRING`",
                    "short": "The captcha verify result"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Canonicalized and final URL for the document, after following page redirects (if any)"
                },
                {
                    "name": "kind",
                    "title": "Kind",
                    "type": "`$STRING`",
                    "short": "Kind of result"
                },
                {
                    "name": "lighthouseResult",
                    "title": "Lighthouse Result",
                    "type": "`$OBJECT`",
                    "short": "The Lighthouse result object"
                },
                {
                    "name": "loadingExperience",
                    "title": "Loading Experience",
                    "type": "`$OBJECT`",
                    "short": "The CrUX loading experience object that contains CrUX data breakdowns"
                },
                {
                    "name": "originLoadingExperience",
                    "title": "Origin Loading Experience",
                    "type": "`$OBJECT`",
                    "short": "The CrUX loading experience object that contains CrUX data breakdowns"
                },
                {
                    "name": "version",
                    "title": "Version",
                    "type": "`$OBJECT`",
                    "short": "The Pagespeed Version object"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "run_pagespeed",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/runPagespeed",
                            "segments": [
                                {
                                    "lit": "runPagespeed"
                                }
                            ],
                            "parts": [
                                "runPagespeed"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "captcha_token",
                                        "orig": "captcha_token",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "locale",
                                        "orig": "locale",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "strategy",
                                        "orig": "strategy",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "DESKTOP"
                                    },
                                    {
                                        "name": "url",
                                        "orig": "url",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "utm_campaign",
                                        "orig": "utm_campaign",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "utm_source",
                                        "orig": "utm_source",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "captcha_token",
                                    "category",
                                    "locale",
                                    "strategy",
                                    "url",
                                    "utm_campaign",
                                    "utm_source"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map