<?php
declare(strict_types=1);

// Pagespeed SDK utility: result_headers

class PagespeedResultHeaders
{
    public static function call(PagespeedContext $ctx): ?PagespeedResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
