# frozen_string_literal: true

# Typed models for the Pagespeed SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# RunPagespeed entity data model.
#
# @!attribute [rw] analysis_utc_timestamp
#   @return [String, nil]
#
# @!attribute [rw] captcha_result
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] lighthouse_result
#   @return [Hash, nil]
#
# @!attribute [rw] loading_experience
#   @return [Hash, nil]
#
# @!attribute [rw] origin_loading_experience
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [Hash, nil]
RunPagespeed = Struct.new(
  :analysis_utc_timestamp,
  :captcha_result,
  :id,
  :kind,
  :lighthouse_result,
  :loading_experience,
  :origin_loading_experience,
  :version,
  keyword_init: true
)

# Request payload for RunPagespeed#load.
#
# @!attribute [rw] analysis_utc_timestamp
#   @return [String, nil]
#
# @!attribute [rw] captcha_result
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] lighthouse_result
#   @return [Hash, nil]
#
# @!attribute [rw] loading_experience
#   @return [Hash, nil]
#
# @!attribute [rw] origin_loading_experience
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [Hash, nil]
RunPagespeedLoadMatch = Struct.new(
  :analysis_utc_timestamp,
  :captcha_result,
  :id,
  :kind,
  :lighthouse_result,
  :loading_experience,
  :origin_loading_experience,
  :version,
  keyword_init: true
)

