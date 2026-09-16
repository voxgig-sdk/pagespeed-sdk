# Pagespeed SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PagespeedFeatures
  def self.make_feature(name)
    case name
    when "base"
      PagespeedBaseFeature.new
    when "ratelimit"
      PagespeedRatelimitFeature.new
    when "retry"
      PagespeedRetryFeature.new
    when "test"
      PagespeedTestFeature.new
    when "timeout"
      PagespeedTimeoutFeature.new
    else
      PagespeedBaseFeature.new
    end
  end
end
