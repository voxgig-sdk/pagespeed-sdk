<?php
declare(strict_types=1);

// Pagespeed SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PagespeedUtility::setRegistrar(function (PagespeedUtility $u): void {
    $u->clean = [PagespeedClean::class, 'call'];
    $u->done = [PagespeedDone::class, 'call'];
    $u->make_error = [PagespeedMakeError::class, 'call'];
    $u->feature_add = [PagespeedFeatureAdd::class, 'call'];
    $u->feature_hook = [PagespeedFeatureHook::class, 'call'];
    $u->feature_init = [PagespeedFeatureInit::class, 'call'];
    $u->fetcher = [PagespeedFetcher::class, 'call'];
    $u->make_fetch_def = [PagespeedMakeFetchDef::class, 'call'];
    $u->make_context = [PagespeedMakeContext::class, 'call'];
    $u->make_options = [PagespeedMakeOptions::class, 'call'];
    $u->make_request = [PagespeedMakeRequest::class, 'call'];
    $u->make_response = [PagespeedMakeResponse::class, 'call'];
    $u->make_result = [PagespeedMakeResult::class, 'call'];
    $u->make_point = [PagespeedMakePoint::class, 'call'];
    $u->make_spec = [PagespeedMakeSpec::class, 'call'];
    $u->make_url = [PagespeedMakeUrl::class, 'call'];
    $u->param = [PagespeedParam::class, 'call'];
    $u->prepare_auth = [PagespeedPrepareAuth::class, 'call'];
    $u->prepare_body = [PagespeedPrepareBody::class, 'call'];
    $u->prepare_headers = [PagespeedPrepareHeaders::class, 'call'];
    $u->prepare_method = [PagespeedPrepareMethod::class, 'call'];
    $u->prepare_params = [PagespeedPrepareParams::class, 'call'];
    $u->prepare_path = [PagespeedPreparePath::class, 'call'];
    $u->prepare_query = [PagespeedPrepareQuery::class, 'call'];
    $u->result_basic = [PagespeedResultBasic::class, 'call'];
    $u->result_body = [PagespeedResultBody::class, 'call'];
    $u->result_headers = [PagespeedResultHeaders::class, 'call'];
    $u->transform_request = [PagespeedTransformRequest::class, 'call'];
    $u->transform_response = [PagespeedTransformResponse::class, 'call'];
});
