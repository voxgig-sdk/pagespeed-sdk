# Pagespeed SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PagespeedUtility.registrar = ->(u) {
  u.clean = PagespeedUtilities::Clean
  u.done = PagespeedUtilities::Done
  u.make_error = PagespeedUtilities::MakeError
  u.feature_add = PagespeedUtilities::FeatureAdd
  u.feature_hook = PagespeedUtilities::FeatureHook
  u.feature_init = PagespeedUtilities::FeatureInit
  u.fetcher = PagespeedUtilities::Fetcher
  u.make_fetch_def = PagespeedUtilities::MakeFetchDef
  u.make_context = PagespeedUtilities::MakeContext
  u.make_options = PagespeedUtilities::MakeOptions
  u.make_request = PagespeedUtilities::MakeRequest
  u.make_response = PagespeedUtilities::MakeResponse
  u.make_result = PagespeedUtilities::MakeResult
  u.make_point = PagespeedUtilities::MakePoint
  u.make_spec = PagespeedUtilities::MakeSpec
  u.make_url = PagespeedUtilities::MakeUrl
  u.param = PagespeedUtilities::Param
  u.prepare_auth = PagespeedUtilities::PrepareAuth
  u.prepare_body = PagespeedUtilities::PrepareBody
  u.prepare_headers = PagespeedUtilities::PrepareHeaders
  u.prepare_method = PagespeedUtilities::PrepareMethod
  u.prepare_params = PagespeedUtilities::PrepareParams
  u.prepare_path = PagespeedUtilities::PreparePath
  u.prepare_query = PagespeedUtilities::PrepareQuery
  u.graphql_body = PagespeedUtilities::GraphqlBody
  u.graphql_errors = PagespeedUtilities::GraphqlErrors
  u.result_basic = PagespeedUtilities::ResultBasic
  u.result_body = PagespeedUtilities::ResultBody
  u.result_headers = PagespeedUtilities::ResultHeaders
  u.transform_request = PagespeedUtilities::TransformRequest
  u.transform_response = PagespeedUtilities::TransformResponse
}
