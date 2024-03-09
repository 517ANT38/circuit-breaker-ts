import { objOpts } from "../util/util";

export default interface State{ 
    change(): State;
    incrementCountFail():void;
    isCallPermitted(): boolean;
}