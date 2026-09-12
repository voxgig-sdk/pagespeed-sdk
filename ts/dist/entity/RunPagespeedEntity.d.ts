import { PagespeedEntityBase } from '../PagespeedEntityBase';
import type { PagespeedSDK } from '../PagespeedSDK';
import type { Control } from '../types';
import type { RunPagespeed, RunPagespeedLoadMatch } from '../PagespeedTypes';
declare class RunPagespeedEntity extends PagespeedEntityBase<RunPagespeed> {
    constructor(client: PagespeedSDK, entopts: any);
    make(this: RunPagespeedEntity): RunPagespeedEntity;
    load(this: any, reqmatch?: RunPagespeedLoadMatch, ctrl?: Control): Promise<RunPagespeedEntity>;
}
export { RunPagespeedEntity };
