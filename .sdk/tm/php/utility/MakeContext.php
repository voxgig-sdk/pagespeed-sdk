<?php
declare(strict_types=1);

// Pagespeed SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PagespeedMakeContext
{
    public static function call(array $ctxmap, ?PagespeedContext $basectx): PagespeedContext
    {
        return new PagespeedContext($ctxmap, $basectx);
    }
}
