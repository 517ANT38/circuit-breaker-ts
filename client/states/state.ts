
export default interface State{ 
    change(): State;
    incrementCountFail():void;
    isCallPermitted(): boolean;
}