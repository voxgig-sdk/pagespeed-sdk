<?php
declare(strict_types=1);

// Pagespeed SDK base feature

class PagespeedBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PagespeedContext $ctx, array $options): void {}
    public function PostConstruct(PagespeedContext $ctx): void {}
    public function PostConstructEntity(PagespeedContext $ctx): void {}
    public function SetData(PagespeedContext $ctx): void {}
    public function GetData(PagespeedContext $ctx): void {}
    public function GetMatch(PagespeedContext $ctx): void {}
    public function SetMatch(PagespeedContext $ctx): void {}
    public function PrePoint(PagespeedContext $ctx): void {}
    public function PreSpec(PagespeedContext $ctx): void {}
    public function PreRequest(PagespeedContext $ctx): void {}
    public function PreResponse(PagespeedContext $ctx): void {}
    public function PreResult(PagespeedContext $ctx): void {}
    public function PreDone(PagespeedContext $ctx): void {}
    public function PreUnexpected(PagespeedContext $ctx): void {}
}
