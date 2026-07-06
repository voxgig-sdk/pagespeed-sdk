-- Typed models for the Pagespeed SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class RunPagespeed
---@field analysis_utc_timestamp? string
---@field captcha_result? string
---@field id? string
---@field kind? string
---@field lighthouse_result? table
---@field loading_experience? table
---@field origin_loading_experience? table
---@field version? table

---@class RunPagespeedLoadMatch
---@field analysis_utc_timestamp? string
---@field captcha_result? string
---@field id string
---@field kind? string
---@field lighthouse_result? table
---@field loading_experience? table
---@field origin_loading_experience? table
---@field version? table

local M = {}

return M
