# Pagespeed SDK utility: feature_add
module PagespeedUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
