import { objOpts } from "../util/util";
import CloseState from "./close-state";
import OpenState from "./open-state";
import State from "./state";

export default class HalfOpenState implements State{
    
    private flag = false;
    opts: objOpts;
    constructor(opts:objOpts){
        this.opts = opts;
    }

    change(): State {
        if(this.flag){
            return new OpenState(this.opts)
        }
        return new CloseState(this.opts);
    }
    incrementCountFail(): void {
        this.flag= true;
    }
   
    isCallPermitted(): boolean {
        return true;
    }

}