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
        "slug" => "pagespeed",
        "version" => "0.0.1",
        "target" => "rb",
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
              "short" => "The UTC timestamp of this analysis",
              "type" => "`$STRING`",
            },
            {
              "name" => "captchaResult",
              "short" => "The captcha verify result",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Canonicalized and final URL for the document, after following page redirects (if any)",
              "type" => "`$STRING`",
            },
            {
              "name" => "kind",
              "short" => "Kind of result",
              "type" => "`$STRING`",
            },
            {
              "name" => "lighthouseResult",
              "short" => "The Lighthouse result object",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "loadingExperience",
              "short" => "The CrUX loading experience object that contains CrUX data breakdowns",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "originLoadingExperience",
              "short" => "The CrUX loading experience object that contains CrUX data breakdowns",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "version",
              "short" => "The Pagespeed Version object",
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
