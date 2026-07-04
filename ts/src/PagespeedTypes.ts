// Typed models for the Pagespeed SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface RunPagespeed {
  analysis_utc_timestamp?: string
  captcha_result?: string
  id?: string
  kind?: string
  lighthouse_result?: Record<string, any>
  loading_experience?: Record<string, any>
  origin_loading_experience?: Record<string, any>
  version?: Record<string, any>
}

export type RunPagespeedLoadMatch = Partial<RunPagespeed>

