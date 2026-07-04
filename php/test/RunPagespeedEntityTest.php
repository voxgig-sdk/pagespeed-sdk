<?php
declare(strict_types=1);

// RunPagespeed entity test

require_once __DIR__ . '/../pagespeed_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RunPagespeedEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PagespeedSDK::test(null, null);
        $ent = $testsdk->RunPagespeed(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = run_pagespeed_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "run_pagespeed." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PAGESPEED_TEST_RUN_PAGESPEED_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $run_pagespeed_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.run_pagespeed")));
        $run_pagespeed_ref01_data = null;
        if (count($run_pagespeed_ref01_data_raw) > 0) {
            $run_pagespeed_ref01_data = Helpers::to_map($run_pagespeed_ref01_data_raw[0][1]);
        }

        // LOAD
        $run_pagespeed_ref01_ent = $client->RunPagespeed(null);
        $run_pagespeed_ref01_match_dt0 = [
            "id" => $run_pagespeed_ref01_data["id"],
        ];
        $run_pagespeed_ref01_data_dt0_loaded = $run_pagespeed_ref01_ent->load($run_pagespeed_ref01_match_dt0, null);
        $run_pagespeed_ref01_data_dt0_load_result = Helpers::to_map($run_pagespeed_ref01_data_dt0_loaded);
        $this->assertNotNull($run_pagespeed_ref01_data_dt0_load_result);
        $this->assertEquals($run_pagespeed_ref01_data_dt0_load_result["id"], $run_pagespeed_ref01_data["id"]);

    }
}

function run_pagespeed_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/run_pagespeed/RunPagespeedTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PagespeedSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["run_pagespeed01", "run_pagespeed02", "run_pagespeed03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PAGESPEED_TEST_RUN_PAGESPEED_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PAGESPEED_TEST_RUN_PAGESPEED_ENTID" => $idmap,
        "PAGESPEED_TEST_LIVE" => "FALSE",
        "PAGESPEED_TEST_EXPLAIN" => "FALSE",
        "PAGESPEED_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PAGESPEED_TEST_RUN_PAGESPEED_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PAGESPEED_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["PAGESPEED_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new PagespeedSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PAGESPEED_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PAGESPEED_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
