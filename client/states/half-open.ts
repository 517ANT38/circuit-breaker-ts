import { objOpts } from "../util/util";
import CloseState from "./close-state";
import OpenState from "./open-state";
import State from "./state";

export default class HalfOpenState implements State{
    
    private flag = false;
    private closeState:State;
    
    
    
    
    constructor(state:State){
        this.closeState = state;
    }

    get opts() : objOpts {
        return this.closeState.opts;
    }


    change(): State {
        let tmp = this.closeState;
        if(this.flag){
            tmp = new OpenState(this);
        }
        this.flag = false;
        return tmp;
    }
    incrementCountFail(): void {
        this.flag = true;
    }
   
    isCallPermitted(): boolean {
        return true;
    }

}