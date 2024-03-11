import CloseState from "../states/close-state";
import State from "../states/state";


export default class StateMashin{

    private state: State;

    constructor(interval: number, maxCountFail: number){
        this.state = new CloseState({interval,maxCountFail});
    }

    incrementCountFail(){
        this.state.incrementCountFail();
    }

    isCallPermitted(){
        
        this.state = this.state.change();        
        return this.state.isCallPermitted();
    }
}