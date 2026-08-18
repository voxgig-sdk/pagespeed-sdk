-- Pagespeed SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Pagespeed",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "captchaResult",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kind",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lighthouseResult",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "loadingExperience",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "originLoadingExperience",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "version",
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
