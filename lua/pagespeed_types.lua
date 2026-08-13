-- Typed models for the Pagespeed SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class RunPagespeed
---@field analysisUTCTimestamp? string
---@field captchaResult? string
---@field id? string
---@field kind? string
---@field lighthouseResult? table
---@field loadingExperience? table
---@field originLoadingExperience? table
---@field version? table

---@class RunPagespeedLoadMatch
---@field analysisUTCTimestamp? string
---@field captchaResult? string
---@field id string
---@field kind? string
---@field lighthouseResult? table
---@field loadingExperience? table
---@field originLoadingExperience? table
---@field version? table

local M = {}

return M
