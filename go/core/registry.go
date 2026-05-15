package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewRunPagespeedEntityFunc func(client *PagespeedSDK, entopts map[string]any) PagespeedEntity

