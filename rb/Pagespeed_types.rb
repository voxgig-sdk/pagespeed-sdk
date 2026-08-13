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
# @!attribute [rw] analysisUTCTimestamp
#   @return [String, nil]
#
# @!attribute [rw] captchaResult
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] lighthouseResult
#   @return [Hash, nil]
#
# @!attribute [rw] loadingExperience
#   @return [Hash, nil]
#
# @!attribute [rw] originLoadingExperience
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [Hash, nil]
RunPagespeed = Struct.new(
  :analysisUTCTimestamp,
  :captchaResult,
  :id,
  :kind,
  :lighthouseResult,
  :loadingExperience,
  :originLoadingExperience,
  :version,
  keyword_init: true
)

# Request payload for RunPagespeed#load.
#
# @!attribute [rw] analysisUTCTimestamp
#   @return [String, nil]
#
# @!attribute [rw] captchaResult
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] lighthouseResult
#   @return [Hash, nil]
#
# @!attribute [rw] loadingExperience
#   @return [Hash, nil]
#
# @!attribute [rw] originLoadingExperience
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [Hash, nil]
RunPagespeedLoadMatch = Struct.new(
  :analysisUTCTimestamp,
  :captchaResult,
  :id,
  :kind,
  :lighthouseResult,
  :loadingExperience,
  :originLoadingExperience,
  :version,
  keyword_init: true
)

