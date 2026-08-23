-- Pagespeed SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Pagespeed",
      slug = "pagespeed",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://pagespeedonline.googleapis.com/pagespeedonline/v5",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["run_pagespeed"] = {},
      },
    },
    entity = {
      ["run_pagespeed"] = {
        ["fields"] = {
          {
            ["name"] = "analysisUTCTimestamp",
            ["short"] = "The UTC timestamp of this analysis",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "captchaResult",
            ["short"] = "The captcha verify result",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Canonicalized and final URL for the document, after following page redirects (if any)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kind",
            ["short"] = "Kind of result",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lighthouseResult",
            ["short"] = "The Lighthouse result object",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "loadingExperience",
            ["short"] = "The CrUX loading experience object that contains CrUX data breakdowns",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "originLoadingExperience",
            ["short"] = "The CrUX loading experience object that contains CrUX data breakdowns",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "version",
            ["short"] = "The Pagespeed Version object",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "run_pagespeed",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "captcha_token",
                      ["orig"] = "captcha_token",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$ARRAY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "locale",
                      ["orig"] = "locale",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "DESKTOP",
                      ["kind"] = "query",
                      ["name"] = "strategy",
                      ["orig"] = "strategy",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "url",
                      ["orig"] = "url",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "utm_campaign",
                      ["orig"] = "utm_campaign",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "utm_source",
                      ["orig"] = "utm_source",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/runPagespeed",
                ["parts"] = {
                  "runPagespeed",
                },
                ["select"] = {
                  ["exist"] = {
                    "captcha_token",
                    "category",
                    "locale",
                    "strategy",
                    "url",
                    "utm_campaign",
                    "utm_source",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
