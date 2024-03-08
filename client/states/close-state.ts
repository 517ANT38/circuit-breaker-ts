import { objOpts } from "../util/util";
import OpenState from "./open-state";
import State from "./state";

export default class CloseState implements State{
    opts: objOpts;
    
    private countFail = 0;

    constructor(opts:objOpts){
        this.opts = opts;
    }
    change(): State {
       if (this.countFail >= this.opts.maxCountFail) {
            return new OpenState(this.opts);
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