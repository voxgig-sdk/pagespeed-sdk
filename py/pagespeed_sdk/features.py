# Pagespeed SDK feature factory

from pagespeed_sdk.feature.base_feature import PagespeedBaseFeature
from pagespeed_sdk.feature.ratelimit_feature import PagespeedRatelimitFeature
from pagespeed_sdk.feature.retry_feature import PagespeedRetryFeature
from pagespeed_sdk.feature.test_feature import PagespeedTestFeature
from pagespeed_sdk.feature.timeout_feature import PagespeedTimeoutFeature


_FEATURES = {
    "base": lambda: PagespeedBaseFeature(),
    "ratelimit": lambda: PagespeedRatelimitFeature(),
    "retry": lambda: PagespeedRetryFeature(),
    "test": lambda: PagespeedTestFeature(),
    "timeout": lambda: PagespeedTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
