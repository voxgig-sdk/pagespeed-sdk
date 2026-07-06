// Typed models for the Pagespeed SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// RunPagespeed is the typed data model for the run_pagespeed entity.
type RunPagespeed struct {
	AnalysisUtcTimestamp *string `json:"analysis_utc_timestamp,omitempty"`
	CaptchaResult *string `json:"captcha_result,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	LighthouseResult *map[string]any `json:"lighthouse_result,omitempty"`
	LoadingExperience *map[string]any `json:"loading_experience,omitempty"`
	OriginLoadingExperience *map[string]any `json:"origin_loading_experience,omitempty"`
	Version *map[string]any `json:"version,omitempty"`
}

// RunPagespeedLoadMatch is the typed request payload for RunPagespeed.LoadTyped.
type RunPagespeedLoadMatch struct {
	AnalysisUtcTimestamp *string `json:"analysis_utc_timestamp,omitempty"`
	CaptchaResult *string `json:"captcha_result,omitempty"`
	Id string `json:"id"`
	Kind *string `json:"kind,omitempty"`
	LighthouseResult *map[string]any `json:"lighthouse_result,omitempty"`
	LoadingExperience *map[string]any `json:"loading_experience,omitempty"`
	OriginLoadingExperience *map[string]any `json:"origin_loading_experience,omitempty"`
	Version *map[string]any `json:"version,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
