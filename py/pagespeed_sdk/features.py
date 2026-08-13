# Pagespeed SDK feature factory

from pagespeed_sdk.feature.base_feature import PagespeedBaseFeature
from pagespeed_sdk.feature.test_feature import PagespeedTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PagespeedBaseFeature(),
        "test": lambda: PagespeedTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
