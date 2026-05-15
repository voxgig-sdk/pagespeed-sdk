<?php
declare(strict_types=1);

// Pagespeed SDK utility: result_body

class PagespeedResultBody
{
    public static function call(PagespeedContext $ctx): ?PagespeedResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
