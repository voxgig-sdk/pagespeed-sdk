// Typed models for the Pagespeed SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface RunPagespeed {
  analysisUTCTimestamp?: string
  captchaResult?: string
  id?: string
  kind?: string
  lighthouseResult?: Record<string, any>
  loadingExperience?: Record<string, any>
  originLoadingExperience?: Record<string, any>
  version?: Record<string, any>
}

export interface RunPagespeedLoadMatch {
  captcha_token?: string
  category?: any[]
  locale?: string
  strategy?: string
  url: string
  utm_campaign?: string
  utm_source?: string
}

