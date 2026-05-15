# Pagespeed SDK feature factory

from feature.base_feature import PagespeedBaseFeature
from feature.test_feature import PagespeedTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PagespeedBaseFeature(),
        "test": lambda: PagespeedTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
