# Pagespeed SDK exists test

require "minitest/autorun"
require_relative "../Pagespeed_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PagespeedSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
