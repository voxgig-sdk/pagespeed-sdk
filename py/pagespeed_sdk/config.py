# Pagespeed SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Pagespeed",
            "slug": "pagespeed",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://pagespeedonline.googleapis.com/pagespeedonline/v5",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "run_pagespeed": {},
            },
        },
        "entity": {
      "run_pagespeed": {
        "fields": [
          {
            "name": "analysisUTCTimestamp",
            "title": "Analysis Utc Timestamp",
            "type": "`$STRING`",
            "short": "The UTC timestamp of this analysis",
          },
          {
            "name": "captchaResult",
            "title": "Captcha Result",
            "type": "`$STRING`",
            "short": "The captcha verify result",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Canonicalized and final URL for the document, after following page redirects (if any)",
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "short": "Kind of result",
          },
          {
            "name": "lighthouseResult",
            "title": "Lighthouse Result",
            "type": "`$OBJECT`",
            "short": "The Lighthouse result object",
          },
          {
            "name": "loadingExperience",
            "title": "Loading Experience",
            "type": "`$OBJECT`",
            "short": "The CrUX loading experience object that contains CrUX data breakdowns",
          },
          {
            "name": "originLoadingExperience",
            "title": "Origin Loading Experience",
            "type": "`$OBJECT`",
            "short": "The CrUX loading experience object that contains CrUX data breakdowns",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$OBJECT`",
            "short": "The Pagespeed Version object",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "runPagespeed",
                  },
                ],
                "parts": [
                  "runPagespeed",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "captcha_token",
                      "orig": "captcha_token",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "locale",
                      "orig": "locale",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "strategy",
                      "orig": "strategy",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "DESKTOP",
                    },
                    {
                      "name": "url",
                      "orig": "url",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "utm_campaign",
                      "orig": "utm_campaign",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "utm_source",
                      "orig": "utm_source",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "captcha_token",
                    "category",
                    "locale",
                    "strategy",
                    "url",
                    "utm_campaign",
                    "utm_source",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
