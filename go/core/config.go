package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Pagespeed",
			"slug": "pagespeed",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://pagespeedonline.googleapis.com/pagespeedonline/v5",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"run_pagespeed": map[string]any{},
			},
		},
		"entity": map[string]any{
			"run_pagespeed": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "analysisUTCTimestamp",
						"short": "The UTC timestamp of this analysis",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "captchaResult",
						"short": "The captcha verify result",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Canonicalized and final URL for the document, after following page redirects (if any)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kind",
						"short": "Kind of result",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lighthouseResult",
						"short": "The Lighthouse result object",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "loadingExperience",
						"short": "The CrUX loading experience object that contains CrUX data breakdowns",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "originLoadingExperience",
						"short": "The CrUX loading experience object that contains CrUX data breakdowns",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "version",
						"short": "The Pagespeed Version object",
						"type": "`$OBJECT`",
					},
				},
				"name": "run_pagespeed",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "captcha_token",
											"orig": "captcha_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "DESKTOP",
											"kind": "query",
											"name": "strategy",
											"orig": "strategy",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "url",
											"orig": "url",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "utm_campaign",
											"orig": "utm_campaign",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "utm_source",
											"orig": "utm_source",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/runPagespeed",
								"parts": []any{
									"runPagespeed",
								},
								"select": map[string]any{
									"exist": []any{
										"captcha_token",
										"category",
										"locale",
										"strategy",
										"url",
										"utm_campaign",
										"utm_source",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
