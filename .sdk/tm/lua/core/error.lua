-- Pagespeed SDK error

local PagespeedError = {}
PagespeedError.__index = PagespeedError


function PagespeedError.new(code, msg, ctx)
  local self = setmetatable({}, PagespeedError)
  self.is_sdk_error = true
  self.sdk = "Pagespeed"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PagespeedError:error()
  return self.msg
end


function PagespeedError:__tostring()
  return self.msg
end


return PagespeedError
