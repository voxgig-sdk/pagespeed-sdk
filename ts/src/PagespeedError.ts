
import { Context } from './Context'


class PagespeedError extends Error {

  isPagespeedError = true

  sdk = 'Pagespeed'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PagespeedError
}

