<?php
declare(strict_types=1);

// Pagespeed SDK utility: prepare_body

class PagespeedPrepareBody
{
    public static function call(PagespeedContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
