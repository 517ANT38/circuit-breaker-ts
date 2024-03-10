import CloseState from "./close-state";
import OpenState from "./open-state";
import State from "./state";

export default class HalfOpenState implements State{
    
    private flag = false;
    private closeState:CloseState;
    
    
    
    
    constructor(state:CloseState){
        this.closeState = state;
    }

    

    change(): State {
        let tmp:State = this.closeState;
        let {interval} = this.closeState.opts;
        if(this.flag){
            tmp = new OpenState(interval,this);
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