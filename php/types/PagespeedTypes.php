<?php
declare(strict_types=1);

// Typed models for the Pagespeed SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** RunPagespeed entity data model. */
class RunPagespeed
{
    public ?string $analysisUTCTimestamp = null;
    public ?string $captchaResult = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?array $lighthouseResult = null;
    public ?array $loadingExperience = null;
    public ?array $originLoadingExperience = null;
    public ?array $version = null;
}

/** Request payload for RunPagespeed#load. */
class RunPagespeedLoadMatch
{
    public ?string $captcha_token = null;
    public ?array $category = null;
    public ?string $locale = null;
    public ?string $strategy = null;
    public string $url;
    public ?string $utm_campaign = null;
    public ?string $utm_source = null;
}

