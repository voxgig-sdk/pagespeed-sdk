# Typed models for the Pagespeed SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class RunPagespeed:
    analysis_utc_timestamp: Optional[str] = None
    captcha_result: Optional[str] = None
    id: Optional[str] = None
    kind: Optional[str] = None
    lighthouse_result: Optional[dict] = None
    loading_experience: Optional[dict] = None
    origin_loading_experience: Optional[dict] = None
    version: Optional[dict] = None


@dataclass
class RunPagespeedLoadMatch:
    analysis_utc_timestamp: Optional[str] = None
    captcha_result: Optional[str] = None
    id: Optional[str] = None
    kind: Optional[str] = None
    lighthouse_result: Optional[dict] = None
    loading_experience: Optional[dict] = None
    origin_loading_experience: Optional[dict] = None
    version: Optional[dict] = None

