# Pagespeed SDK utility: make_context
require_relative '../core/context'
module PagespeedUtilities
  MakeContext = ->(ctxmap, basectx) {
    PagespeedContext.new(ctxmap, basectx)
  }
end
