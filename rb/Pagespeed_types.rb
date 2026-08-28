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
# @!attribute [rw] captcha_token
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [Array, nil]
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] strategy
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] utm_campaign
#   @return [String, nil]
#
# @!attribute [rw] utm_source
#   @return [String, nil]
RunPagespeedLoadMatch = Struct.new(
  :captcha_token,
  :category,
  :locale,
  :strategy,
  :url,
  :utm_campaign,
  :utm_source,
  keyword_init: true
)

