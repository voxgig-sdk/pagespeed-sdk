package voxgigpagespeedsdk

import (
	"github.com/voxgig-sdk/pagespeed-sdk/go/core"
	"github.com/voxgig-sdk/pagespeed-sdk/go/entity"
	"github.com/voxgig-sdk/pagespeed-sdk/go/feature"
	_ "github.com/voxgig-sdk/pagespeed-sdk/go/utility"
)

// Type aliases preserve external API.
type PagespeedSDK = core.PagespeedSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PagespeedEntity = core.PagespeedEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PagespeedError = core.PagespeedError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewRunPagespeedEntityFunc = func(client *core.PagespeedSDK, entopts map[string]any) core.PagespeedEntity {
		return entity.NewRunPagespeedEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPagespeedSDK = core.NewPagespeedSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewPagespeedSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *PagespeedSDK  { return NewPagespeedSDK(nil) }
func Test() *PagespeedSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
