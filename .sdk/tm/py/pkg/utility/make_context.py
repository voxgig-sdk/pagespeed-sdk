# Pagespeed SDK utility: make_context

from projectname_sdk.core.context import PagespeedContext


def make_context_util(ctxmap, basectx):
    return PagespeedContext(ctxmap, basectx)
