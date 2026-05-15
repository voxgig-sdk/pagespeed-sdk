# Pagespeed SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PagespeedFeatures
  def self.make_feature(name)
    case name
    when "base"
      PagespeedBaseFeature.new
    when "test"
      PagespeedTestFeature.new
    else
      PagespeedBaseFeature.new
    end
  end
end
