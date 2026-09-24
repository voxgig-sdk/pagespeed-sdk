"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagespeedError = void 0;
class PagespeedError extends Error {
    isPagespeedError = true;
    sdk = 'Pagespeed';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PagespeedError = PagespeedError;
//# sourceMappingURL=PagespeedError.js.map