# Pagespeed SDK exists test

import pytest
from pagespeed_sdk import PagespeedSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PagespeedSDK.test(None, None)
        assert testsdk is not None
