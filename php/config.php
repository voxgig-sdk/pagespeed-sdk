<?php
declare(strict_types=1);

// Pagespeed SDK configuration

class PagespeedConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Pagespeed",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://pagespeedonline.googleapis.com/pagespeedonline/v5",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "run_pagespeed" => [],
                ],
            ],
            "entity" => [
        'run_pagespeed' => [
          'fields' => [
            [
              'name' => 'analysisUTCTimestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'captchaResult',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'kind',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lighthouseResult',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'loadingExperience',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'originLoadingExperience',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'version',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'run_pagespeed',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'captcha_token',
                        'orig' => 'captcha_token',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$ARRAY`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'locale',
                        'orig' => 'locale',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'DESKTOP',
                        'kind' => 'query',
                        'name' => 'strategy',
                        'orig' => 'strategy',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'url',
                        'orig' => 'url',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'utm_campaign',
                        'orig' => 'utm_campaign',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'utm_source',
                        'orig' => 'utm_source',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/runPagespeed',
                  'parts' => [
                    'runPagespeed',
                  ],
                  'select' => [
                    'exist' => [
                      'captcha_token',
                      'category',
                      'locale',
                      'strategy',
                      'url',
                      'utm_campaign',
                      'utm_source',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PagespeedFeatures::make_feature($name);
    }
}
