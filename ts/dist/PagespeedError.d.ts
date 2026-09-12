import { Context } from './Context';
declare class PagespeedError extends Error {
    isPagespeedError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { PagespeedError };
