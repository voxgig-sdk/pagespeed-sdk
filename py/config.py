# Pagespeed SDK configuration


def make_config():
    return {
        "main": {
            "name": "Pagespeed",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://pagespeedonline.googleapis.com/pagespeedonline/v5",
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
            "name": "analysis_utc_timestamp",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "captcha_result",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "kind",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "lighthouse_result",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "loading_experience",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "origin_loading_experience",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "version",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 7,
          },
        ],
        "name": "run_pagespeed",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "captcha_token",
                      "orig": "captcha_token",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "reqd": False,
                      "type": "`$ARRAY`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "locale",
                      "orig": "locale",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "DESKTOP",
                      "kind": "query",
                      "name": "strategy",
                      "orig": "strategy",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "url",
                      "orig": "url",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "utm_campaign",
                      "orig": "utm_campaign",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "utm_source",
                      "orig": "utm_source",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/runPagespeed",
                "parts": [
                  "runPagespeed",
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
