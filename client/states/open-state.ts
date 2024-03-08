import { objOpts } from "../util/util";
import HalfOpenState from "./half-open";
import State from "./state";

export default class OpenState implements State{
    
    private readonly opentime_at=Date.now();
    opts: objOpts;
    constructor(opts:objOpts){
        this.opts = opts;
    }   

    isCallPermitted(): boolean {
        return false;
    }

    change(): State {
        
        if (Math.abs(this.opentime_at - Date.now())>=this.opts.interval) {
            return new HalfOpenState(this.opts);
        }
        return this;
    }
    incrementCountFail(): void {
        
    }

}