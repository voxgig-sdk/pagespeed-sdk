
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Pagespeed',
        slug: "pagespeed",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://pagespeedonline.googleapis.com/pagespeedonline/v5",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      run_pagespeed: {
      },

    }
  }


  entity = {
    "run_pagespeed": {
      "fields": [
        {
          "name": "analysisUTCTimestamp",
          "short": "The UTC timestamp of this analysis",
          "type": "`$STRING`"
        },
        {
          "name": "captchaResult",
          "short": "The captcha verify result",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Canonicalized and final URL for the document, after following page redirects (if any)",
          "type": "`$STRING`"
        },
        {
          "name": "kind",
          "short": "Kind of result",
          "type": "`$STRING`"
        },
        {
          "name": "lighthouseResult",
          "short": "The Lighthouse result object",
          "type": "`$OBJECT`"
        },
        {
          "name": "loadingExperience",
          "short": "The CrUX loading experience object that contains CrUX data breakdowns",
          "type": "`$OBJECT`"
        },
        {
          "name": "originLoadingExperience",
          "short": "The CrUX loading experience object that contains CrUX data breakdowns",
          "type": "`$OBJECT`"
        },
        {
          "name": "version",
          "short": "The Pagespeed Version object",
          "type": "`$OBJECT`"
        }
      ],
      "name": "run_pagespeed",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "captcha_token",
                    "orig": "captcha_token",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$ARRAY`"
                  },
                  {
                    "kind": "query",
                    "name": "locale",
                    "orig": "locale",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "DESKTOP",
                    "kind": "query",
                    "name": "strategy",
                    "orig": "strategy",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "url",
                    "orig": "url",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "utm_campaign",
                    "orig": "utm_campaign",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "utm_source",
                    "orig": "utm_source",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/runPagespeed",
              "parts": [
                "runPagespeed"
              ],
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
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

