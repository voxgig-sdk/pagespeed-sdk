# Pagespeed SDK utility: make_context

from core.context import PagespeedContext


def make_context_util(ctxmap, basectx):
    return PagespeedContext(ctxmap, basectx)
