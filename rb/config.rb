# Pagespeed SDK configuration

module PagespeedConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Pagespeed",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://pagespeedonline.googleapis.com/pagespeedonline/v5",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "run_pagespeed" => {},
        },
      },
      "entity" => {
        "run_pagespeed" => {
          "fields" => [
            {
              "name" => "analysisUTCTimestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "captchaResult",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "kind",
              "type" => "`$STRING`",
            },
            {
              "name" => "lighthouseResult",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "loadingExperience",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "originLoadingExperience",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "version",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "run_pagespeed",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "captcha_token",
                        "orig" => "captcha_token",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "kind" => "query",
                        "name" => "locale",
                        "orig" => "locale",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "DESKTOP",
                        "kind" => "query",
                        "name" => "strategy",
                        "orig" => "strategy",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "url",
                        "orig" => "url",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "utm_campaign",
                        "orig" => "utm_campaign",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "utm_source",
                        "orig" => "utm_source",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/runPagespeed",
                  "parts" => [
                    "runPagespeed",
                  ],
                  "select" => {
                    "exist" => [
                      "captcha_token",
                      "category",
                      "locale",
                      "strategy",
                      "url",
                      "utm_campaign",
                      "utm_source",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PagespeedFeatures.make_feature(name)
  end
end
