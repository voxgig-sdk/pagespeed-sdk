# RunPagespeed entity test

require "minitest/autorun"
require "json"
require_relative "../Pagespeed_sdk"
require_relative "runner"

class RunPagespeedEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PagespeedSDK.test(nil, nil)
    ent = testsdk.RunPagespeed(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = run_pagespeed_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "run_pagespeed." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PAGESPEED_TEST_RUN_PAGESPEED_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    run_pagespeed_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.run_pagespeed")))
    run_pagespeed_ref01_data = nil
    if run_pagespeed_ref01_data_raw.length > 0
      run_pagespeed_ref01_data = Helpers.to_map(run_pagespeed_ref01_data_raw[0][1])
    end

    # LOAD
    run_pagespeed_ref01_ent = client.RunPagespeed(nil)
    run_pagespeed_ref01_match_dt0 = {
      "id" => run_pagespeed_ref01_data["id"],
    }
    run_pagespeed_ref01_data_dt0_loaded = run_pagespeed_ref01_ent.load(run_pagespeed_ref01_match_dt0, nil)
    run_pagespeed_ref01_data_dt0_load_result = Helpers.to_map(run_pagespeed_ref01_data_dt0_loaded.respond_to?(:data_get) ? run_pagespeed_ref01_data_dt0_loaded.data_get : run_pagespeed_ref01_data_dt0_loaded)
    assert !run_pagespeed_ref01_data_dt0_load_result.nil?
    assert_equal run_pagespeed_ref01_data_dt0_load_result["id"], run_pagespeed_ref01_data["id"]

  end
end

def run_pagespeed_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "run_pagespeed", "RunPagespeedTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PagespeedSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["run_pagespeed01", "run_pagespeed02", "run_pagespeed03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["PAGESPEED_TEST_RUN_PAGESPEED_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PAGESPEED_TEST_RUN_PAGESPEED_ENTID" => idmap,
    "PAGESPEED_TEST_LIVE" => "FALSE",
    "PAGESPEED_TEST_EXPLAIN" => "FALSE",
    "PAGESPEED_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["PAGESPEED_TEST_RUN_PAGESPEED_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PAGESPEED_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["PAGESPEED_APIKEY"],
      },
      extra || {},
    ])
    client = PagespeedSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PAGESPEED_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PAGESPEED_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
