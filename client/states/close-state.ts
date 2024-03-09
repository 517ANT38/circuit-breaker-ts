import { objOpts } from "../util/util";
import HalfOpenState from "./half-open";
import OpenState from "./open-state";
import State from "./state";

export default class CloseState implements State{
    
    
    private halfState:State;
    private countFail = 0;
    private _opts:objOpts;

    
    
    

    constructor(opts:objOpts){
        this.halfState = new HalfOpenState(this);
        this._opts = opts;
    }

    get opts() : objOpts {
        return this._opts;
    }
    change(): State {
       if (this.countFail >= this.opts.maxCountFail) {
            this.countFail = 0;
            return new OpenState(this.halfState);
       }
       return this;
    }
    incrementCountFail(): void {
        this.countFail++;
    }
    isCallPermitted(): boolean {
        return true;
    }
}