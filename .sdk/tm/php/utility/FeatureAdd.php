<?php
declare(strict_types=1);

// Pagespeed SDK utility: feature_add

class PagespeedFeatureAdd
{
    public static function call(PagespeedContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
