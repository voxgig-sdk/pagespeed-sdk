<?php
declare(strict_types=1);

// Pagespeed SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PagespeedFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PagespeedBaseFeature();
            case "test":
                return new PagespeedTestFeature();
            default:
                return new PagespeedBaseFeature();
        }
    }
}
