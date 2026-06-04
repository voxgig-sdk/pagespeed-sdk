package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/pagespeed-sdk/go"
	"github.com/voxgig-sdk/pagespeed-sdk/go/core"

	vs "github.com/voxgig-sdk/pagespeed-sdk/go/utility/struct"
)

func TestRunPagespeedEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RunPagespeed(nil)
		if ent == nil {
			t.Fatal("expected non-nil RunPagespeedEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := run_pagespeedBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "run_pagespeed." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set PAGESPEED_TEST_RUN_PAGESPEED_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		runPagespeedRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.run_pagespeed", setup.data)))
		var runPagespeedRef01Data map[string]any
		if len(runPagespeedRef01DataRaw) > 0 {
			runPagespeedRef01Data = core.ToMapAny(runPagespeedRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = runPagespeedRef01Data

		// LOAD
		runPagespeedRef01Ent := client.RunPagespeed(nil)
		runPagespeedRef01MatchDt0 := map[string]any{
			"id": runPagespeedRef01Data["id"],
		}
		runPagespeedRef01DataDt0Loaded, err := runPagespeedRef01Ent.Load(runPagespeedRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		runPagespeedRef01DataDt0LoadResult := core.ToMapAny(runPagespeedRef01DataDt0Loaded)
		if runPagespeedRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if runPagespeedRef01DataDt0LoadResult["id"] != runPagespeedRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func run_pagespeedBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "run_pagespeed", "RunPagespeedTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read run_pagespeed test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse run_pagespeed test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"run_pagespeed01", "run_pagespeed02", "run_pagespeed03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("PAGESPEED_TEST_RUN_PAGESPEED_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PAGESPEED_TEST_RUN_PAGESPEED_ENTID": idmap,
		"PAGESPEED_TEST_LIVE":      "FALSE",
		"PAGESPEED_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["PAGESPEED_TEST_RUN_PAGESPEED_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PAGESPEED_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewPagespeedSDK(core.ToMapAny(mergedOpts))
	}

	live := env["PAGESPEED_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PAGESPEED_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
