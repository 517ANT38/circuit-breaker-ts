import { objOpts } from "../util/util";
import HalfOpenState from "./half-open";
import State from "./state";

export default class OpenState implements State{
    
    private readonly opentimeAt=Date.now();
    private halfOpenState: State;
   
    constructor(state:State){
        
        this.halfOpenState = state;
    }   

    get opts() : objOpts {
        return this.halfOpenState.opts;
    }

    isCallPermitted(): boolean {
        return false;
    }

    change(): State {
        let {interval} = this.halfOpenState.opts;
        if (Math.abs(this.opentimeAt - Date.now())>=interval) {
            return this.halfOpenState;
        }
        return this;
    }
    incrementCountFail(): void {
        
    }

}