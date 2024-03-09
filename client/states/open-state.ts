import { objOpts } from "../util/util";
import HalfOpenState from "./half-open";
import State from "./state";

export default class OpenState implements State{
    
    private readonly opentimeAt=Date.now();
    private halfOpenState: State;
    private interval:number;


    constructor(interval:number,state:State){
        
        this.halfOpenState = state;
        this.interval = interval;
    }   

   

    isCallPermitted(): boolean {
        return false;
    }

    change(): State {
        if (Math.abs(this.opentimeAt - Date.now())>=this.interval) {
            return this.halfOpenState;
        }
        return this;
    }
    incrementCountFail(): void {
        
    }

}